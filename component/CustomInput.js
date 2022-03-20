import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const CustomInput = props => {
  const {
    showIcon = '',
    iname = '',
    placeholder,
    keyboardType,
    value,
    onChangeText,
  } = props;

  //iname es noombre de icono
  //placeholder es lo que dira antes de escribir
  //keyboard type = tipo de teclado, numerico, caracter , correo
  //valor = al contenido total y debe se rsiempre igual a la variable
  //funcion para guardar los contenidos , se inserta en la pagina que quieras
  //on change text data => setcodeValue(data) data es lo que vamos editando y va almacenando
  //se hace con hooks es como un setter y getter al mismo tiempo
  // const [passwordValue, setpasswordValue] = useState('');

  return (
    <View style={styles.inputContainer}>
      <Icon name={iname} color="white" size={15} style={styles.icon} />
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 5,
    height: 50,
    width: 370,
    borderWidth: 2,
    padding: 5,
    backgroundColor: 'black',
    borderColor: 'black',
    borderRadius: 25,
  },
  input: {
    color: 'white',
  },

  icon: {
    padding: 10,
  },
});
export default CustomInput;
