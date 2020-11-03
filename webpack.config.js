const path = require('path');
const fs = require('fs'); // node file system module (to read directory contents)
// const webpack = require('webpack');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
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
    // favicon: './src/favicon/favicon.ico',
    cache: false, // https://github.com/webpack/webpack/issues/10761  fixes hot-reload of css
  }));
}

// Generate array in which will be used by HtmlWebpackPlugin
const htmlPlugins = generateHtmlPlugins('./src/');

// Webpack Setup
module.exports = {
  // switched to having a single entry point, line below is original entry setup
  // entry: ['./src/js/entry.js', './src/scss/entry.scss'],
  // switching allowed for multiple outputs of css or js files if wanted
  entry: {
    jsbundle: './src/js/entry.js',
    // cssbundle: './src/scss/entry.scss',
  },

  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [

      // src/*.html files
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              attributes: {
                list: [
                  // adding in both data-src and data-srcset for lazy loading (https://github.com/aFarkas/lazysizes)
                  '...', // All default supported tags and attributes
                  {
                    tag: 'source', // <picture> <source data-src> element (lazysizes)
                    attribute: 'data-src',
                    type: 'src',
                  },
                  {
                    tag: 'source', // <picture> <source data-srcset> element (lazysizes)
                    attribute: 'data-srcset',
                    type: 'srcset',
                  },
                  { // <img data-src> (lazysizes)
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                  {
                    tag: 'img', // <img data-srcset> (lazysizes)
                    attribute: 'data-srcset',
                    type: 'srcset',
                  },
                  { // <video> <source src> element (default, html-loader didn't support it)
                    tag: 'source',
                    attribute: 'src',
                    type: 'src',
                  },
                ],
              },
            },
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
        // not having the following line allows for node_module files to be included when imported
        // include: path.resolve(__dirname, 'src/scss/'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [cssnano],
                  [autoprefixer],
                ],
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },

      // src/img/ files
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        // include: path.resolve(__dirname, 'src/img/'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[ext]',
              context: 'src',
              limit: 10000,
              fallback: 'file-loader',
              publicPath: '../', // fixes url-loader/file-loader local url issues (url becomes: .././rest-of-url)
            },
          },
          { loader: 'img-loader' },
        ],
      },

      // src/vid/ files
      {
        test: /\.mp4$/i,
        // include: path.resolve(__dirname, 'src/vid/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'vid/[name].[ext]',
              publicPath: '../',
            },
          },
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
              publicPath: '../', // fixes url-loader/file-loader local url issues (url becomes: .././rest-of-url)
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
        test: /\.(txt|xml|toml)$/i,
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
    new Dotenv({
      path: './.env',
      allowEmptyValues: true,
    }), // use of .env files
    // new webpack.EnvironmentPlugin(['MAPBOX_API']),
  ].concat(htmlPlugins), // Inserts a new HtmlWebpackPlugin for each .html file
  // .concat([new PreloadWebpackPlugin({ // preload fonts with <link red="pre-load"> https://stackoverflow.com/a/63645412
  //   // fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
  //   fileWhitelist: [/\.(woff2)(\?.*)?$/i],
  //   include: 'allAssets',
  //   rel: 'preload',
  //   as: 'font',
  // })]),

  devServer: {
    contentBase: './build',
  },
};
