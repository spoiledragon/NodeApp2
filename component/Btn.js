import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';

const Btn = props => {
  const {text,onPress} = props;
  return (
    <TouchableOpacity style={styles.ButtonContainer}
    onPress={onPress}>
      <Text style={styles.ButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    alignContent:"center",
    backgroundColor: 'black',
    height:50,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius:25,
    alignContent:'center',
    alignItems:'center',
    width:200,
  },
  ButtonText: {
    color: 'white',
    textAlign:"center",
    fontSize:15,
  },
});
export default Btn;
