/** @format */

import { AppRegistry, Platform } from 'react-native';
import { App } from './src/App';
import { hot } from 'react-hot-loader'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS == 'web') {
  hot(module)(App);

  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  });
}
