import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { IStyles } from './interfaces/styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press Cmd+R or Ctrl+R to reload',
});

type Props = {};
export class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/images/logo.png')} />
        <Text style={styles.welcome}>Welcome to Trutoo Native for {Platform.OS}!</Text>
        <Text style={styles.instructions}>To get started, edit <Text style={styles.code}>src/App.tsx</Text></Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f2f0',
  },
  logo: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#404040',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 5,
  },
  code: {
    padding: 5,
    fontFamily: 'monospace',
    color: '#fbaa1f',
    backgroundColor: '#556371',
  },
});
