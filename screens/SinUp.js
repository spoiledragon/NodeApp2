import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from '../component/Btn';
import {Tile} from 'react-native-elements';

const SinUp = ({navigation}) => {
  const [nameValue, setnameValue] = useState('');
  const [codeValue, setcodeValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneeValue, setphoneValue] = useState('');
  const [mailValue, setmailValue] = useState('');
  const [jobValue, setjobValue] = useState('');
  const [gradeValue, setgradeValue] = useState('');

  const validate = () => {
    if (!nameValue) {
      console.log('A');
      return false;
    }
    if (!codeValue) {
      console.log('B');
      return false;
    }

    if (!passwordValue) {
      console.log('C');
      return false;
    }
    if (!phoneeValue) {
      console.log('D');
      return false;
    }

    if (!mailValue) {
      console.log('E');
      return false;
    }
    if (!jobValue) {
      console.log('F');
      return false;
    }
    if (!gradeValue) {
      console.log('G');
      return false;
    }
    return true;
  };

  function showToastWithGravity(mensaje) {
    ToastAndroid.showWithGravity(
      mensaje,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const btnRegister = () => {
    if (validate()) {
      console.log('Si es Valido');
      //aqui se hace toda la funcion
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          //aqui es que nos contesto el server
          console.log(xhttp.responseText);
          if (xhttp.responseText == 0) {
            console.log('No Se Registro');
            //No se Registro
            this.setState.Codigo = 'Error de Registro';
            //showToastWithGravity('Error de Registro');
            Alert.alert('Error de Registro');
          }
          if (xhttp.responseText == 1) {
            //Usuario Registrado con Exito
            console.log('Registrado Con Exito');
            Alert.alert('Registrado Con Exito');
            //showToastWithGravity('Registrado Con Exito');
            navigation.navigate('Login');
          }
          if (xhttp.responseText == 2) {
            //usuario YA existe
            console.log('Usuario Ya Registrado');
            Alert.alert('Usuario Ya Registrado');
            //showToastWithGravity('Usuario Ya Registrado');
          }
        }
      };
      xhttp.open(
        //Register.php?name=Pepe&code=0000000002&pass=pepe123&tel=1010101010&mail=pepe.furry@gmail.com&school=cucea&semester=segundo
        'GET',
        'https://spoiledragon.000webhostapp.com/Register.php?name=' +
          nameValue +
          '&code=' +
          codeValue +
          '&pass=' +
          passwordValue +
          '&tel=' +
          phoneeValue +
          '&mail=' +
          mailValue +
          '&school=' +
          jobValue +
          '&semester=' +
          gradeValue,
      );
      console.log(
        'https://spoiledragon.000webhostapp.com/Register.php?name=' +
          nameValue +
          '&code=' +
          codeValue +
          '&pass=' +
          passwordValue +
          '&tel=' +
          phoneeValue +
          '&mail=' +
          mailValue +
          '&school=' +
          jobValue +
          '&semester=' +
          gradeValue,
      );
      xhttp.send();
    } else {
      showToastWithGravity('Faltan Campos por llenar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Tile
          imageSrc={require('../Imagenes/background.png')}
          title="Registro"
          featured
          caption="SpoilApp Carrera"
        />
        <View style={styles.inputContainer}>
          <Icon name="glasses" color="white" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}
            placeholder="Name"
            placeholderTextColor="white"
            value={nameValue}
            onChangeText={data => setnameValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="code" color="white" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}
            placeholder="Code"
            keyboardType="number-pad"
            placeholderTextColor="white"
            value={codeValue}
            onChangeText={data => setcodeValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="key" color="white" size={15} style={styles.icon} />
          <TextInput
            style={styles.text}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
            value={passwordValue}
            onChangeText={data => setPasswordValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="call" color="white" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}
            placeholder="Telephone"
            keyboardType="number-pad"
            placeholderTextColor="white"
            value={phoneeValue}
            onChangeText={data => setphoneValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="mail" color="white" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}

            placeholder="Mail"
            keyboardType="email-address"
            placeholderTextColor="white"
            value={mailValue}
            onChangeText={data => setmailValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="book" color="white" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}
            placeholder="School"
            placeholderTextColor="white"
            value={jobValue}
            onChangeText={data => setjobValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="md-time" color="white" size={15} style={styles.icon} />
          <TextInput
            style={styles.text}
            placeholder="Grade"
            placeholderTextColor="white"
            keyboardType="number-pad"
            value={gradeValue}
            onChangeText={data => setgradeValue(data)}
          />
        </View>
        <View style={styles.containerbtn}>
          <Btn
            text="Registrar"
            onPress={() => {
              btnRegister();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 5,
    height: 60,
    borderWidth: 2,
    padding: 1,
    backgroundColor: 'black',
    borderColor: '#1a1a1a',
    borderRadius: 25,
    marginTop: 20,
  },
  input: {
    color: 'white',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
  },
  icon: {
    padding: 20,
  },
  containerbtn: {
    marginTop:10,
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius:25,
  },
});

export default SinUp;
