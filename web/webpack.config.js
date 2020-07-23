'use strict';
const path = require('path');
const {DefinePlugin, ProvidePlugin} = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const webDir = __dirname;
const isDevServer = !!process.argv.find((v) =>
  v.includes('webpack-dev-server'),
);
const compileModules = [];

module.exports = (_, argv) => ({
  context: rootDir,
  entry: ['index.web.js'],
  mode: argv.mode || 'development',
  output: {
    path: path.join(webDir, 'dist'),
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.json',
      '.web.json',
    ],
    modules: [rootDir, 'node_modules'],
    alias: {'react-native$': 'react-native-web'},
  },
  module: {
    rules: [
      {
        // Source files and non-compiled node_modules
        test: /\.(js|ts)x?$/,
        include: [
          path.join(rootDir, 'index.web.js'),
          path.join(rootDir, 'src'),
        ].concat(
          compileModules.map((name) =>
            path.join(rootDir, 'node_modules', name),
          ),
        ),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        // Images
        test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
        use: [
          {
            loader: 'react-native-web-image-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        // All other assets
        test: /\.(eot|otf|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      isDevServer,
      'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
      __DEV__: argv.mode === 'production' || true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(webDir, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(rootDir, 'tsconfig.json'),
      },
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ].concat(
    isDevServer
      ? [
          new ProvidePlugin({
            Promise: ['core-js/es/promise'], // Polyfill promises for react-hot-reload on dev servers
          }),
        ]
      : [],
  ),

  devServer: {
    contentBase: path.resolve(webDir, 'dist'),
    host: '0.0.0.0',
    compress: true,
    port: 3002,
    hot: true,
  },

  performance: {
    maxEntrypointSize: 512000,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            ascii_only: true,
            webkit: true,
          },
          compress: {
            typeofs: false,
            inline: 3,
            pure_getters: true,
            passes: 3,
          },
        },
      }),
    ],
  },

  devtool: isDevServer ? 'cheap-module-eval-source-map' : false,
});
