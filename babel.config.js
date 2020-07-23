const webpack = {
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: 'cjs',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-optional-catch-binding'],
    ['@babel/plugin-proposal-optional-chaining'],
    ['babel-plugin-react-native-web'],
    ['react-hot-loader/babel'],
  ],
};

const metro = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [],
};

module.exports = ({caller}) => {
  // is either "metro" or "@babel-loader"
  const runningIn = caller(({name}) => name);
  return runningIn === 'metro' ? metro : webpack;
};
