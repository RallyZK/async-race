const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function showMode() {
  let mode = isDev ? 'Development' : 'Production';
  console.log(`---------- MODE: ${mode} ----------`);
}
showMode();

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  //context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,    
  },
  resolve: {
    extensions: ['.ts', '.js'],    
  },
  optimization: optimization(),
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
    },
    port: 9000,
    open: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif|ico)$/,
        type: 'asset/resource',        
        generator: {
          filename: 'assets/icons/[name][ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(ogg|mp3|wav|mpeg|mpg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]',
        },
      },
    ],
  },
};