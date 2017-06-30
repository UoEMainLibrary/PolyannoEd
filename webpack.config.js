/*
  Okay folks, want to learn a little bit about webpack?
*/

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] } // this is one way of passing options
  }]
}

const polyannoSetup = {
  test: /\.(js)$/,
  include: [path.resolve(__dirname, 'javascripts', 'modules')],
  use: [{
    loader: 'script-loader'
  }]
}

const styles = {
  test: /\.css$/,
  include: path.resolve(__dirname, 'public/style'),
  use: ExtractTextPlugin.extract({
    use: 'css-loader'
  })
}

// compress the js
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
})

// OK - now it's time to put it all together
const config = {
  entry: {
    PolyannoEd: './public/javascripts/PolyannoEd.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript, polyannoSetup, styles]
  },
  plugins: [
    new ExtractTextPlugin('[name].style.css')
  ],
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'javascripts', 'modules', 'utils.js')
    }
  }
}

process.noDeprecation = true

module.exports = config
