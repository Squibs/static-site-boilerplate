const path = require('path');
const fs = require('fs'); // node file system module (to read directory contents)

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// postcss-loader plugins
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// Thank you to Frank Kelleher (extri.co)
// https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
function generateHtmlPlugins(templateDir) {
  // retrieve directory contents of passed directory
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  // filter out any non-html directory contents
  templateFiles = templateFiles.filter((item) => /\.html$/i.test(item));

  // return new array created from each html item
  return templateFiles.map((item) => new HtmlWebpackPlugin({
    filename: item,
    template: path.resolve(__dirname, `${templateDir}/${item}`),
    favicon: './src/favicon/favicon.ico',
    cache: false, // https://github.com/webpack/webpack/issues/10761  fixes hot-reload of css
  }));
}

// Generate array in which will be used by HtmlWebpackPlugin
const htmlPlugins = generateHtmlPlugins('./src/');

// Webpack Setup
module.exports = {
  entry: ['./src/js/entry.js', './src/scss/entry.scss'],

  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/bundle.js',
  },

  module: {
    rules: [

      // src/*.html files
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },

      // src/js/*.js files
      {
        test: /\.js$/i,
        include: /js/,
        use: { loader: 'babel-loader' },
      },

      // src/scss/*.scss files
      {
        test: /\.(sa|sc|c)ss$/i,
        include: path.resolve(__dirname, 'src/scss/'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                cssnano,
                autoprefixer,
              ],
            },
          },
          { loader: 'sass-loader' },
        ],
      },

      // src/img/ files
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        include: path.resolve(__dirname, 'src/img/'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              limit: 10000,
              fallback: 'file-loader',
              publicPath: '../', // fixes url-loader/file-loader loacl url issues (url becomes: .././rest-of-url)
            },
          },
          { loader: 'img-loader' },
        ],
      },

      // src/webfont/ files
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        include: path.resolve(__dirname, 'src/webfonts/'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              limit: 10000,
              fallback: 'file-loader',
              publicPath: '../', // fixes url-loader/file-loader loacl url issues (url becomes: .././rest-of-url)
            },
          },
        ],
      },

      // src/php/ files
      {
        test: /\.php$/i,
        include: path.resolve(__dirname, 'src/php/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      },

      // src/favicon/ files
      {
        test: /\.(jpe?g|png|gif|svg|xml|webmanifest|ico)$/i,
        include: path.resolve(__dirname, 'src/favicon/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[name].[ext]',
            },
          },
        ],
      },

      // other root files
      {
        test: /\.(txt|xml)$/i,
        include: path.resolve(__dirname, 'src/^root/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[name].[ext]',
            },
          },
        ],
      },

      // .htaccess
      {
        test: /\.(htaccess)$/i,
        include: path.resolve(__dirname, 'src/^root/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './.htaccess',
            },
          },
        ],
      },

    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
    new BrowserSyncPlugin({
      proxy: 'localhost:8001',
      open: false, // tired of new tabs opening, have to open first tab manually now
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: '../bundle-stats.json',
    }),
  ].concat(htmlPlugins), // Inserts a new HtmlWebpackPlugin for each .html file

  devServer: {
    contentBase: './build',
  },
};
