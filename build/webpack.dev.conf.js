var fs = require('fs')
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new FriendlyErrorsPlugin(),
    // momentjs
    // new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
    //   // check if the context was created inside the moment package
    //   if (!/\/moment\//.test(context.context)) { return }
    //   // context needs to be modified in place
    //   Object.assign(context, {
    //     // include only japanese, korean and chinese variants
    //     // all tests are prefixed with './' so this must be part of the regExp
    //     // the default regExp includes everything; /^$/ could be used to include nothing
    //     regExp: /^\.\/(ja|ko|zh|fr|es|pt)/,
    //       // point to the locale data folder relative to moment/src/lib/locale
    //     request: '../../locale'
    //   })
    // })
  ]
})
