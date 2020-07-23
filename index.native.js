/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const main = () => App;

AppRegistry.registerComponent(appName, main);
