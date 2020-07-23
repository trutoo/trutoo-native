/**
 * @format
 */

import {hot} from 'react-hot-loader/root';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const main = () => App;
hot(main);

AppRegistry.registerComponent(appName, main);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
