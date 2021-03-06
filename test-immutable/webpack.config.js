// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
//const autoprefixerloader= require('autoprefixer-loader');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.module.loaders[0].query.plugins.push('transform-class-properties')
  webpackConfig.module.loaders[0].query.plugins.push('react-html-attrs')
  // 实现antd的安需加载
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css', // if true, use less
  }]);
  if(  process.env.NODE_ENV !== 'production' ) {
    webpackConfig.debug = true;
    webpackConfig.devtool = 'inline-source-map'
  } else {
    webpackConfig.output.path = '../static/js/react';
  }

  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  // Enable this if you have to support IE8.
  // webpackConfig.module.loaders.unshift({
  //   test: /\.jsx?$/,
  //   loader: 'es3ify-loader',
  // });

  //  下面的代码是为了兼容修改主色系
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  // Parse all less files as css module.
  // webpackConfig.module.loaders.forEach(function(loader, index) {
  //   if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
  //     loader.test = /\.dont\.exist\.file/;
  //   }
  //   if (loader.test.toString() === '/\\.module\\.less$/') {
  //     loader.test = /\.less$/;
  //   }
  // });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce(function (memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
