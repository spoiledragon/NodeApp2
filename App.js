

import MainStack from './Navigation/MainStack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';


function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainStack/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  Text: {
    color: 'red'
  },
});

export default App;
