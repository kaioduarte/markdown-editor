const common = require('../webpack/common')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = [
    ...defaultConfig.module.rules,
    {
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['standard-loader']
    }
  ]

  defaultConfig.resolve = common.resolve

  return defaultConfig
}
