const { merge } = require('webpack-merge');
const base = require('../webpack.base');
const { resolve } = require('path');
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    assetModuleFilename: 'assets/images/[name][ext]',
    filename: 'assets/scripts/[name].bundle.js',
  },
  devServer: {
    static: {
      directory: resolve(__dirname, './public'),
    },
    compress: true,
    port: 4614,
    historyApiFallback: true,
    proxy: {
      '/admin': {
        // target:'http://10.100.26.89',
        target: 'http://gb-t.naton.cn',
        // target: 'http://localhost:4614',
        ws: true,
        secure: false,
        changeOrigin: true,
        // pathRewrite: { '^/admin': 'http://10.100.26.89/admin' },
        pathRewrite: { '^/admin': 'http://gb-t.naton.cn/admin' },
        // pathRewrite: { '^/admin': 'http://localhost:4614/admin' },
      },
    },
  },
  stats: 'errors-only',
  plugins: [],
};
module.exports = merge(base, devConfig);
