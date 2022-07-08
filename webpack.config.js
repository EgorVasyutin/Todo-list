const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src/'),
  mode: 'development',
  entry: './main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.sass', '.css', '.html', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Webpack App',
      template: 'index.html'
    }),
    new ESLintPlugin({
      files: 'src/**/*.ts'
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets/img', to: 'assets/img' }]
    })
  ]
}
