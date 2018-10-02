/* HELPERS */
const { CPUS } = require('./helpers');

/* PLUGINS */


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
    test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
    loader: 'file-loader',
    options: {
      name: `assets/[${env.mode === 'production' ? 'hash' : 'name'}].[ext]`,
    },
  },
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
          workers: CPUS >= 4 ? CPUS - 2 : 1,
        },
      },
      {
        loader: 'babel-loader',
        options: env.babel,
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
