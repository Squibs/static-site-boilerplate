const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs'); // node file system module (to read directory contents)

// Thank you to Frank Kelleher (extri.co)
// https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
function generateHtmlPlugins(templateDir) {
  // retrieve directory contents of passed directory
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  // filter out any non-html directory contents
  templateFiles = templateFiles.filter(item => /\.html$/i.test(item));

  // return new array created from each html item
  return templateFiles.map(item => new HtmlWebPackPlugin({
    filename: item,
    template: path.resolve(__dirname, `${templateDir}/${item}`),
    favicon: './src/favicon/favicon.ico',
  }));
}

// Generate array in which will be used by HtmlWebPackPlugin
const htmlPlugins = generateHtmlPlugins('./src/');

// Webpack Setup
module.exports = {
  entry: ['./src/js/entry.js', './src/scss/entry.scss'],

  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/bundle.js',
  },

  module: {
    rules: [

      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { mimimize: true },
          },
        ],
      },

      {
        test: /\.js$/i,
        include: /js/,
        use: { loader: 'babel-loader' },
      },

      {
        test: /\.scss$/i,
        include: /scss/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { mimimize: true },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: /img/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './img/[name].[ext]',
              limit: 10000,
              fallback: 'file-loader',
            },
          },
          { loader: 'img-loader' },
        ],
      },

      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        include: /webfonts/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './webfonts/[name].[ext]',
              limit: 10000,
              fallback: 'file-loader',
              publicPath: '../', // fixes url-loader/file-loader loacl url issues (url becomes: .././rest-of-url)
            },
          },
        ],
      },

    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/bundle.css',
    }),
  ].concat(htmlPlugins), // Inserts a new HtmlWebPackPlugin for each .html file

  devServer: {
    contentBase: './build',
  },
};
