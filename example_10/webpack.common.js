const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

﻿module.exports = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js'
  },
  target: 'web',
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
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/views/index.pug'
    })
  ],
}
