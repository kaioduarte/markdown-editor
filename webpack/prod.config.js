'use strict'

const { join } = require('path')

const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'production',

  entry: common.entry,

  output: {
    ...common.output
    // chunkFilename: '[name].bundle.js'
  },

  plugins: [
    new CleanPlugin(['dist'], {
      root: join(__dirname, '..')
    }),
    new MiniCSSExtractPlugin({ filename: '[name]-[chunkhash].css' }),
    new HtmlPlugin({
      ...common.htmlPluginConfig('template.html'),
      minify: true
    })
  ].concat(
    process.env.ANALYZER
      ? new BundleAnalyzerPlugin()
      : []
  ),

  module: {
    ...common.module,
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      {
        ...common.cssLoader,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          reuseExistingChunk: true,
          test: /node_modules\/((react(-dom)?|fbjs|prop-types)|(preact(-compat)?))\//,
          name: 'react-build',
          chunks: 'initial',
          priority: 10
        },
        modules: {
          reuseExistingChunk: true,
          test: /node_modules\//,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },

  stats: common.stats,

  resolve: {
    alias: {
      ...common.resolve.alias,
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
}
