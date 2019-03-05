const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin= require('extract-text-webpack-plugin')
const CleanWebpackPlugin= require('clean-webpack-plugin')
const Webpack = require('webpack')

const dir = Path.join(__dirname,'dist')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle[hash].js',
    path: dir
  },
  mode: 'development',
  module: {
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new ExtractTextWebpackPlugin('style.css'),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
     hot: true
  },
}