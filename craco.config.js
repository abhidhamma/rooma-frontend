const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        jsConfigPath: 'jsconfig.paths.json',
      },
    },
  ],
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
}
