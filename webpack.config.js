const path = require('path')
// const handlebars = require('handlebars-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// use extract-text-webpack-plugin only in prod
const isProd = process.env.NODE_ENV === 'production' // true or false
// dev
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
// prod
const cssProd = ExtractTextPlugin.extract({
  // we want to use css
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        // url: false,
        url: true,
        sourceMap: true,
      },
    },
    // we want to use sass
    {
      loader: 'sass-loader',
      options: {
        // get original scss in production
        sourceMap: true,
      },
    },
  ],
})

const cssConfig = isProd ? cssProd : cssDev
module.exports = {
  // polyfill is for async/await
  // entry: ['babel-polyfill', './src/index.js'],
  entry: ['./src/index.js'],
  output: {
    // path: path.resolve(__dirname, 'public/assets/js'),
    // output goes inside 'dist' folder
    path: path.resolve(__dirname, 'dist'),
    // all js goes in this one file
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // if you need handlebars
      // {
      //   test: /\.hbs$/, loader: "handlebars-loader"
      // },
      {
        // look for css or scss
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        // all js except for node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // use babel to transpile modern js into old js
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // look for all images inside src
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            // creating files in output
            loader: 'file-loader',
            options: {
              // name: '[path][name].[ext]',
              // name: '[path][name].[ext]?[hash]',
              // how images will be named
              name: '[name].[ext]?[hash]',
              // where images are going
              outputPath: 'assets/img',
            },
          },
          {
            // optimize images
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // hot reload for dev
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // if you want to use handlebars
    // new HtmlWebpackPlugin({
    //   title: 'Custom template using Handlebars',
    //   template: 'index.hbs',
    // }),
    new HTMLWebpackPlugin({
      // inject custom title
      title: 'Todo Webpack App',
      // minify: {
      //   collapseWhitespace: true,
      // },
      hash: true,
      // our html template
      template: './src/index.html',
    }),
    // html-webpack-plugin must come before favicons-webpack-plugin in the plugins array
    new FaviconsWebpackPlugin({
      // here is our image we want to turn into a favicon
      logo: './src/assets/img/favicon-32x32.png',
      cache: true,
      // publicPath: '/static',
      // store favicons stuff inside favicon directory
      prefix: 'assets/favicon',
      inject: true,
    }),
    new ExtractTextPlugin({
      // our prod css bundle
      filename: 'bundle.css',
      // if dev don't use extract text plugin
      disable: !isProd,
      allChunks: true,
    }),
  ],
  // plugins: [new HTMLPlugin(), new ExtractTextPlugin('bundle.css')],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    // dev server doesn't record to hard drive only in memory
    contentBase: path.resolve(__dirname, 'dist'),
    // publicPath: '/assets/js/',
    // make as small as possible
    compress: true,
    // our port
    port: 9000,
    // hot reloading is on
    hot: true,
    // open a new browser when app starts up
    open: true,
    // truncate the terminal output when webpack runs
    stats: 'errors-only',
  },
  // turn on source maps
  devtool: 'source-map',
}
