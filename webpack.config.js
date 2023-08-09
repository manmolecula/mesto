// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = (env) => {
  const production = env.production;

  return {
    entry: { 
      index: './src/pages/index.js' 
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? 'scripts/[name].[contenthash].js' : 'scripts/[name].js',
      publicPath: ''
    },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,

    open: true
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader', {
          loader: 'css-loader',
          options: { importLoaders: 1},
        },
        'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator:{
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator:{
          filename: 'font/[hash][ext][query]'
        }
      }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? 'styles/[name].[contenthash].css' : 'styles/[name].css'
    })
  ]
  } 
}

// переписали точку выхода, используя утилиту path