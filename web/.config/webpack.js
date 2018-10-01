const path = require('path');

const { WEB_DIR, IS_DEV_SERVER } = require('../../.config/webpack/helpers');
const config = require('../../.config/webpack/config');
const babel = require('../../.config/webpack/babel');

const POLYFILL_BROWSERS = require('./browsers');

module.exports = (env, argv) => {

  if (typeof env) env = {};

  babel.presets.unshift(
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

  env.babel = babel;

  const configX = config(env, argv);

  configX.output.path = path.join(WEB_DIR, 'dist');
  configX.resolve.alias['react-native$'] = 'react-native-web';
  if (IS_DEV_SERVER) configX.devServer.port = 8082;

  return configX;
}

