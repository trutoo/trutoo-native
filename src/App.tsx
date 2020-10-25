import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Platform, Image } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
  web: 'Press Cmd+R or Ctrl+R to reload',
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Image style={styles.image} source={require('./assets/images/logo.png')} />
              <Text style={styles.sectionTitle}>Welcome to Trutoo Native for {Platform.OS}!</Text>
              <Text style={styles.sectionDescription}>
                To get started, edit <Text style={styles.code}>src/App.tsx</Text>
              </Text>
              <Text style={styles.sectionDescription}>{instructions}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your
                edits.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e5e5e5',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#404040',
  },
  image: {
    width: 256,
    height: 256,
    resizeMode: 'contain',
  },
  code: {
    padding: 5,
    fontFamily: 'monospace',
    color: '#fbaa1f',
    backgroundColor: '#556371',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#404040',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
