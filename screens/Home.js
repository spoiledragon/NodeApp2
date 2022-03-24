import {View, Text,StyleSheet,Dimensions,} from 'react-native';
import React from 'react';
import Btn from '../component/Btn';
import Main from './DrawerPedorro';
import MenuDrawer from 'react-native-side-drawer';

const Home = ({navigation}) => {



  //lo que vemos
  //const {pasarCode} = route.params;
  return (
      <Text style={styles.texto}>Hola </Text>
    
  );
};

const styles = StyleSheet.create({
  texto:{
    color:"black",
    fontSize:15,
  },
  
});



export default Home;
