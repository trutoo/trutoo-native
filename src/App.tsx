import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { IStyles } from './interfaces/styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Just wait and enjoy the magic',
});

type Props = {};
export class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native for {Platform.OS}!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Image style={styles.logo} source={require('./assets/images/snake.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#556270',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E4A691',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#F7EFD8',
    marginBottom: 5,
  },
  logo: {
    marginTop: 64,
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
});
