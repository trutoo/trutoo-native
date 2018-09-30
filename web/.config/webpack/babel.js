const POLYFILL_BROWSERS = require('../browsers.js');
const config = require('../../../babel.config');

config.presets.push(
  [
    '@babel/preset-env',
    {
      //debug: true,
      modules: false,
      useBuiltIns: 'entry',
      targets: POLYFILL_BROWSERS,
    },
  ],
);

module.exports = config;