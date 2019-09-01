const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

﻿module.exports = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/views/index.pug'
    })
  ]
}
