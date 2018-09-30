const path = require('path');

/* HELPERS */
const { CPUS, WEB_DIR } = require('./helpers');

/* PLUGINS */

/* BABEL */
const BabelOptions = require('./babel');

/* POSTCSS
const PostCSSVariablesPath = path.join(SOURCE_DIR, 'styles', 'postcss.variables.js');
const PostCSSMediaPath = path.join(SOURCE_DIR, 'styles', 'postcss.media.js');
const PostCSSMixinsPath = path.join(SOURCE_DIR, 'styles', 'postcss.mixins.js');

/* FACTORIES
function loadVariables() { return require(PostCSSVariablesPath); }
function loadMedia() { return require(PostCSSMediaPath); }
function loadMixins() { return require(PostCSSMixinsPath); }
*/


//------------------------------------------------------------------------------------
// PRODUCTION
//------------------------------------------------------------------------------------

ProductionLoaders = (env) => [

];

//------------------------------------------------------------------------------------
// DEVELOPMENT
//------------------------------------------------------------------------------------

DevelopmentLoaders = (env) => [

];

//------------------------------------------------------------------------------------
// POSTCSS
//------------------------------------------------------------------------------------

PostCSSLoaders = (env) => [

];

//------------------------------------------------------------------------------------
// BASE
//------------------------------------------------------------------------------------

Loaders = (env) => ([
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.join(WEB_DIR, '.cache')
        },
      },
      {
        loader: 'thread-loader',
        options: {
          // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
          workers: CPUS >= 4 ? CPUS - 2 : 1,
        },
      },
      {
        loader: 'babel-loader',
        options: BabelOptions,
      },
    ],
  },

]).concat(
  env.mode === 'production' ? ProductionLoaders(env) : DevelopmentLoaders(env),
);

module.exports = {
  ProductionLoaders,
  DevelopmentLoaders,
  PostCSSLoaders,
  Loaders,
};
