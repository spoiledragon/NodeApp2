import {View, Text,StyleSheet,Dimensions,} from 'react-native';
import React from 'react';
import Btn from '../component/Btn';
import {createDrawerNavigator} from 'react-navigation'

const Home = ({navigation, route}) => {



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
