const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : 'js/[name].[contenthash:8].js'
    // chunkFilename: isDev ? '[name].js' : 'js/[name].[contenthash:8].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } }
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-loader',
      //   },
      // },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              whitespace: 'condense'
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: { hot: isDev, reloadAll: isDev }
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: ExtractCssChunksPlugin.loader,
            options: { hot: isDev, reloadAll: isDev }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new ExtractCssChunksPlugin({
      filename: isDev ? '[name].css' : 'css/[name].[contenthash:8].css'
      // chunkFilename: isDev ? '[name].css' : 'css/[name].[contenthash:8].css',
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'dist')
    }])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    index: 'index.html',
    // quiet: true,
    // noInfo: true,
    port: 9001,
    lazy: false,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    // compress: true,
    // open: true,
    historyApiFallback: true,
    clientLogLevel: 'silent'
  }
}
