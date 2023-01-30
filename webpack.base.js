const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const { resolve } = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const WebpackBar = require('webpackbar');
const useEnv = yargs(hideBin(process.argv)).argv.mode;
const mode = useEnv === 'production' ? true : false;
console.log(resolve(__dirname, 'dist'), resolve(__dirname, './dist'));
let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'postcss-loader',
  },
];
const base = {
  entry: {
    main: resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      common: resolve('src/common'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
      pages: resolve('src/pages'),
      store: resolve('src/store'),
      routes: resolve('src/routes'),
      utils: resolve('src/utils'),
      menus: resolve('src/menus'),
      sdk: resolve('src/sdk'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
      },
      {
        test: /\.(css|scss|less)$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|jpg|jpeg|gif|jpeg｜woff|woff2|tff|svg|otf|webp|glb)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: resolve(__dirname, 'public/au.svg'),
      title: '用户中心',
      filename: 'index.html',
      template: resolve(__dirname, 'public/index.html'),
      inject: true,
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: mode ? 'assets/styles/[name].[contenthash:5].css' : 'styles[name].css',
      chunkFilename: mode ? 'assets//styles/[id].[contenthash:5].css' : 'styles[id].css',
      ignoreOrder: true,
    }),
    new WebpackBar(),
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(useEnv),
    }),
  ],
};
module.exports = base;
