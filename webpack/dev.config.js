'use strict'

const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: common.entry,

  output: {
    ...common.output,
    filename: '[name]-[hash].js',
    publicPath: ''
  },

  plugins: [
    new DashboardPlugin(),
    new HtmlPlugin(common.htmlPluginConfig('template.html'))
  ],

  module: {
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.cssLoader,
      common.fileLoader,
      common.urlLoader
    ]
  },

  stats: common.stats,

  resolve: common.resolve
}
