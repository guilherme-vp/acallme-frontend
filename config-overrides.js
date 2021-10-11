const { addWebpackAlias, override, useBabelRc } = require('customize-cra')

module.exports = override(useBabelRc())
