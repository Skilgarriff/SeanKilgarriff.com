/* eslint global-require: 0*/

// webpack.config.prod.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Css Loader
const cssLoaders = [
  {
    loader: 'css',
    query: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
    },
  },
  {
    loader: 'postcss',
    query: {
      plugins() {
        return [
          require('precss')({ /* ...options */ }),
          require('autoprefixer')({ /* ...options */ }),
        ];
      },
    },
  },
];


// Get the environment of staging vs production in here.
// Then assign the urls based off of that.

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.GA_ID': JSON.stringify('xxxxxxxxxx'),
    }),
    new CopyWebpackPlugin([
      { from: 'public/' },
    ]),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: cssLoaders,
        }),
      },
    ],
  },
};