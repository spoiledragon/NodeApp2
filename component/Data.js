import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class Data extends Component {
  render() {
    return (
      <View>
        <Text>Data</Text>
      </View>
    );
  }

  TraeDatos = async() => {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    var datau = json.parse(jsonValue);
    console.log('se ha guardado', datau[0]);
    //conexcion al servidor

  };

  componentDidMount(){
      this.TraeDatos();
  }
}
