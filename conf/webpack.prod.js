const os = require('os');
const { merge } = require('webpack-merge');
const base = require('../webpack.base');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'assets/scripts/[name].[contenthash:5].bundle.js',
    assetModuleFilename: 'assets/images/[name].[contenthash:5].bundle.[ext]',
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name: 'commons',
        },
      },
      minSize: {
        javascript: 100000,
        style: 100000,
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1,
        // minify:TerserPlugin.esbuildMinify, webpack5自带prepack esbuild破坏prepack
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
};
module.exports = merge(base, prodConfig);
