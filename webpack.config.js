const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

// JavaScript rule for .js files
const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] }
  }]
}

// plugin for compressing js files
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
})

// put the assets into single point of entry
const config = {
  entry: {
    App: './public/javascripts/polyannoed.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript]
  },
  // finally we pass it an array of our plugins - uncomment if you want to uglify
  // plugins: [uglify]
  plugins: [
    // new ExtractTextPlugin('style.css')
  ]
}

// silence deprecation notification
process.noDeprecation = true

module.exports = config
