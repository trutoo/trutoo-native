const path = require('path');

/* HELPERS */
const { WEB_DIR, ROOT_DIR, IS_DEV_SERVER, PUBLIC_PATH } = require('./helpers');

/* PLUGINS */
const {
  DefinePlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NormalModuleReplacementPlugin,
  optimize,
  SourceMapDevToolPlugin,
} = require('webpack');
const ModuleConcatenationPlugin = optimize.ModuleConcatenationPlugin;

const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//------------------------------------------------------------------------------------
// PRODUCTION
//------------------------------------------------------------------------------------

ProductionPlugins = (env) => [

  // Concatenates the scope of all your modules into one closure through "scope-hoising".
  // https://webpack.js.org/plugins/module-concatenation-plugin/
  new ModuleConcatenationPlugin(),

  // Uses UglifyJS v3 (`uglify-es`) to minify the JavaScript bundle
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
  new UglifyJsPlugin({
    test: /\.js(\?.*)?$/i,
    cache: true,
    parallel: true,
    uglifyOptions: {
      output: {
        ascii_only: true,
        comments: false,
        webkit: true,
      },
      ecma: 5,
      mangle: true,
      compress: {
        typeofs: false,
        inline: 3,
        pure_getters: true,
        passes: 3,
      },
    },
  }),
];

//------------------------------------------------------------------------------------
// DEVELOPMENT
//------------------------------------------------------------------------------------

DevelopmentPlugins = (env) => [

  // Enables Hot Module Replacement, otherwise known as HMR.
  // https://webpack.js.org/plugins/hot-module-replacement-plugin/
  new HotModuleReplacementPlugin(),

  // Enables more fine grained control of source map generation.
  // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
  // TODO: understand reasoning behind this plugin
  new SourceMapDevToolPlugin({
    filename: '[file].map[query]',
    moduleFilenameTemplate: '[resource-path]',
    fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
    sourceRoot: 'webpack:///',
  }),
];

//------------------------------------------------------------------------------------
// BASE
//------------------------------------------------------------------------------------

Plugins = (env) => ([

  // The DefinePlugin allows you to create global constants which can be
  // configured at compile time.
  // https://webpack.js.org/plugins/define-plugin/
  new DefinePlugin({
    VERSION: JSON.stringify(new Date()),
  }),

  // Allows for replacing resources that match a given RegExp with a new resource
  // Replaces the debug environment with the env specified one
  // https://webpack.js.org/plugins/normal-module-replacement-plugin/
  new NormalModuleReplacementPlugin(/environments\/environment$/, (resource) => {
    if (env.environment === 'local') return;
    resource.request = resource.request.replace(
      `environments/environment`,
      `environments/environment.${env.environment}`,
    );
  }),

  new EnvironmentPlugin({
    PUBLIC_PATH: PUBLIC_PATH,
  }),

  // Detect circular dependencies in compiled modules.
  // https://github.com/aackerman/circular-dependency-plugin/
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: false,
  }),


  // Runs TypeScript type checker on a separate process.
  // https://github.com/Realytics/fork-ts-checker-webpack-plugin/
  new ForkTsCheckerWebpackPlugin({
    tsconfig: path.join(ROOT_DIR, 'tsconfig.json'),
    tslint: path.join(ROOT_DIR, 'tslint.json'),
    checkSyntacticErrors: true,
  }),

  // Simplifies creation of HTML files to serve code bundles.
  // https://github.com/jantimon/html-webpack-plugin/
  new HtmlWebpackPlugin({
    template: path.join(ROOT_DIR, 'index.html'),
    xhtml: true,
  }),

  // Replaces build information with a progress bar
  // https://github.com/clessg/progress-bar-webpack-plugin/
  // TODO: Reduce log output before enabling
  // new ProgressBarPlugin(),

]).concat(
  IS_DEV_SERVER
    ? [
      // DEV SERVER
    ] : [
      // NOT DEV SERVER
    ],
  env.mode === 'production' ? ProductionPlugins(env) : DevelopmentPlugins(env),
);

module.exports = {
  DevelopmentPlugins,
  ProductionPlugins,
  Plugins,
};
