const path = require('path');

const { ROOT_DIR } = require('./helpers.js');

const config = require('../../babel.config');

config.babelrc = false;
config.cacheDirectory = path.join(ROOT_DIR, '.cache');
config.presets.unshift(
  '@babel/preset-typescript',
);
config.plugins.push(
  'react-hot-loader/babel',
);

module.exports = config;
