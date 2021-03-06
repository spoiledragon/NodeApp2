import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Btn from '../component/Btn';
import {Input, Icon, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomInput from '../component/CustomInput';
import Data from '../component/Data';

const Login = ({navigation}) => {
  const [codeValue, setcodeValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');
  const [visible, setVisibility] = React.useState(false);

  //Funciones

  useEffect(() => {
    getData();
  }, []);

  const btnRegister = () => {
    navigation.navigate('SingUp');
  };

  //Funciones Mas complejas
  const saveData = async () => {
    //solo la mandare a llamar cuando logeen
      //solo la mandare a llamar cuando logeen
        let user = {
          Code: codeValue,
          Password: passwordValue,
        };
        await AsyncStorage.setItem('@UserKeys', JSON.stringify(user));
        console.log('Datos Almacenados', {user});
       
  };
  

  const getData = () => {
    try {
      AsyncStorage.getItem('@UserKeys').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setcodeValue(user.Code);
          setpasswordValue(user.Password);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

 

  const btnLogin = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        //aqui es que nos contesto el server
        console.log(xhttp.responseText);
        if (xhttp.responseText == 0) {
          //usuario autentificadoy
          saveData();
          setcodeValue('');
          setpasswordValue('');
          navigation.navigate('Drawer', {pasarCode: codeValue});
        }
        if (xhttp.responseText == 1) {
          //usuario o contrase??a incorrecta
          Alert.alert('Error', 'Usario no Encontrado', [
            {
              text: 'OK',
              onPress: () => console.log('Usuario O CONTRASE??A INVALIDA'),
            },
          ]);
        }
        if (xhttp.responseText == 2) {
          //usuario no existe
          Alert.alert('Error', 'Usuario No Existe', [
            {text: 'OK', onPress: () => console.log('Usuario NO EXISTE')},
          ]);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/Login.php?cod=' +
        codeValue +
        '&pass=' +
        passwordValue,
      true,
    );
    console.log(
      'https://spoiledragon.000webhostapp.com/Login.php?cod=' +
        codeValue +
        '&pass=' +
        passwordValue,
    );
    xhttp.send();
  };

  //lo que se ve
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Imagenes/background.png')}
        style={styles.bg}>
        <Image
          style={styles.avatar}
          size={200}
          rounded
          source={require('../Imagenes/logo.png')}
        />

        <View style={styles.inputContainer}>
          <Icon name="person" color="white" size={15} style={styles.icon} />
          <TextInput
            style={styles.inputtext}
            placeholder="Codigo"
            keyboardType="phone-pad"
            placeholderTextColor="white"
            value={codeValue}
            onChangeText={data => setcodeValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" color="white" size={15} style={styles.icon} />
          <TextInput
            style={styles.inputtext}
            placeholder="Password"
            placeholderTextColor="white"
            value={passwordValue}
            secureTextEntry={!visible}
            onChangeText={data => setpasswordValue(data)}
          />
        </View>
        <View style={styles.container_Button}>
          <Btn
            text="Login uwu"
            onPress={() => {
              btnLogin();
            }}
          />

          <Btn
            text="Register"
            onPress={() => {
              btnRegister();
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
  
  
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    color: 'white',
  },
  container: {
    flex: 1,
  },
  bg: {
    with: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  avatar: {
    marginTop: 30,
    width: 200,
    height: 200,
    marginLeft: 100,
    marginBottom: 60,
  },
  container_Button: {
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 5,
    height: 50,
    borderWidth: 2,
    padding: 5,
    backgroundColor: 'black',
    borderColor: 'black',
    borderRadius: 25,
  },
  inputtext: {
    flex: 1,
    color: 'white',
  },
  icon: {
    padding: 10,
  },
});

export default Login;
