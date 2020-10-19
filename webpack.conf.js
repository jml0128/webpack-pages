const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { entry, pages } = require('./src/app')
const publicPath = './static'

module.exports = {
  entry: Object.assign(
    {
      vender: './src/common.js',
      vendersearch: './src/search.js',
    },
    entry
  ),
  output: {
    filename: `${publicPath}/[name][contenthash:8].js?v=[contenthash:8]`,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src', ':data-background'],
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/assets/scss/variables.scss'),
                path.resolve(__dirname, 'src/assets/scss/mixin.scss'),
                path.resolve(__dirname, 'src/assets/scss/font.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|png|jpg|gif|svg|mp4|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: `[hash:6].[ext]`,
              limit: 1,
              outputPath: './static',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${publicPath}/[name][contenthash:8].css?v=[contenthash:8]`,
    }),
    ...pages.reduce((pre, cur) => {
      pre.push(new HtmlWebPackPlugin(cur))
      return pre
    }, []),
  ],
}
