const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const fs = require('fs'); // node file system module (to read directory contents)

// thank you to Frank Kelleher (extri.co)
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

const htmlPlugins = generateHtmlPlugins('./src/');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { mimimize: true },
          },
        ],
      },
    ],
  },

  plugins: [
  ].concat(htmlPlugins),

  devServer: {
    contentBase: './build',
  },
};
