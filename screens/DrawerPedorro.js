import React, { Component, useState } from 'react';
import { NavigationContext } from '@react-navigation/native';
import { Avatar, Tile } from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Input, Icon, Button, Picker, Image, Card } from 'react-native-elements';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_participantes: 0,
      open: false,
      NombreP: '',
      centroP: '',
      IdP: '',
      Avatar:
        'https://i.pinimg.com/736x/cd/aa/03/cdaa035a2e82532857070e0007d977a6.jpg',
      km: 0,
      codigo:0,
      Corredores: [],
    };
  }

  //drawwer!!
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  gotodrawer = () => {
    this.props.navigation.navigate("Mapa", { pasarCode: this.state.codigo});
  };

  drawerContent = () => {
    //AQUI ES EL DRAWER EQUIS DE
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <View style={styles.avatar}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: this.state.Avatar,
            }}
          />
        </View>
        <View>
          <Text style={styles.Info}>{this.state.NombreP}</Text>
          <Text style={styles.Info}>{this.state.IdP}</Text>
          <Text style={styles.Info}>{this.state.centroP}</Text>
          <Text style={styles.Info}>{this.state.num_participantes}</Text>


        </View>
      </TouchableOpacity >
    );
  };
  //fin del drawer!!

  //PANTALLA PRINCIPAL QUE SI SE VE
  render() {
    const users = [
      {
        name: 'Karlo',
        avatar:
          'https://i.pinimg.com/736x/cd/aa/03/cdaa035a2e82532857070e0007d977a6.jpg',
        km: 5.4,
      },
      {
        name: 'Krystal',
        avatar:
          'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/277169460_627688334989775_1979254251867421709_n.jpg?stp=dst-jpg_p552x414&_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHBuKE0eIeEVITpJDyOcwtm5P6u3dYsu_Hk_q7d1iy78WbLjsqqfrpbZXx5XXMQYmGtxOvJ2GCXTLqMY0kwK0ft&_nc_ohc=QTfJEhZ8ZiAAX_3iMBX&tn=LwYmHrA9cqHQm4E9&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT_yYv0k5-Z_tfG_lNO_FVOSezWNKW4xGDQO-hd49ngg7w&oe=62429171',
        km: 2.4,
      },
      {
        name: 'Marco',
        avatar:
          'https://i.pinimg.com/550x/72/df/30/72df30b8b200848e492625ef95dd2e50.jpg',
        km: 1.2,
      },
    ];
    //console.log("Los corredores son Fin",users[0]);

    return (
      <View style={styles.container}>
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={50}
          animationTime={250}
          overlay={true}
          opacity={0.4}>

          <Tile
            imageSrc={require('../Imagenes/background.png')}
            title="Participantes"
            featured
            caption={this.state.num_participantes}
            height={200}
          />






          <TouchableOpacity onPress={this.gotodrawer} style={styles.body}>
            <Icon name="navicon" type="evilicon" color="white" />
          </TouchableOpacity>

          <Card containerStyle={styles.containerCard}>
            <Card.Title style={styles.cardtitle}>Leaderboard</Card.Title>
          </Card>

         
          {this.state.Corredores.map((u, i) => {
            if (i < 3) {
              return (
                <View key={i} style={styles.user}>
                  <Avatar
                    size={69}
                    rounded
                    source={{ uri: u.Photo }}
                    containerStyle={styles.midAvatar}
                  />
                  <Text style={styles.Infocard}>{u.Code}</Text>
                  <Text style={styles.Infocard}>M: {u.Distance}</Text>
                  <Text style={styles.Infocard}>Hrs: {u.Time}</Text>
                  <Text style={styles.contador}>{i + 1}</Text>
                </View>
              );
            }
          })}
           <TouchableOpacity style={{backgroundColor:"white"}} onPress={this.gotodrawer}></TouchableOpacity>
        </MenuDrawer>
      </View >
    );
  }
  // Funciones

  TraeDatos = async () => {
    let _this = this;

    try {
      AsyncStorage.getItem('@UserKeys').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          //conexcion al servidor
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              var Datos = xhttp.responseText;
              //console.log(Datos);
              var arr = Datos.split(',');
              _this.setState({ NombreP: arr[0] });
              _this.setState({ IdP: arr[1] });
              _this.setState({ centroP: arr[0] });
              _this.setState({ num_participantes: arr[3] });
              _this.setState({ Avatar: arr[4] });
              _this.setState({codigo:user.Code});

            }
          };

          xhttp.open(
            'GET',
            'https://spoiledragon.000webhostapp.com/Cont.php?cod=' + user.Code,
          );
          xhttp.send();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  /* FUNCION 2*/
  /* ///////////////////////////////////////////////// 2*/
  /*SELECT codigo, distancia, tiempo,(distancia/tiempo) as puntos FROM `EstadisticasC`  
ORDER BY `puntos`  DESC */

  //AQUI
  TraeDatos2 = () => {
    let _this = this;
    //conexcion al servidor
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log('entra');
        _this.setState({ Corredores: JSON.parse(xhttp2.responseText) });
      }
    };
    xhttp2.open('GET', 'https://spoiledragon.000webhostapp.com/Table.php');
    xhttp2.send();
  };

  /* ///////////////////////////////////////////////// 2*/
  /* FIN DEFUNCION 2*/

  componentDidMount() {
    this.TraeDatos();
    this.TraeDatos2();
  }
}
//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  Info: {
    marginTop: 10,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  animatedBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 10,
  },
  body: {
    marginTop: 10,
    marginRight: 350,
    alignContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    borderBottomColor: '#eda137',
    borderWidth: 2,
    marginTop: 10,
    height: 64,
    alignItems: 'center',
    alignContent: "flex-start",
  },
  containerCard: {
    width: 360,
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
  },
  cardtitle: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  Infocard: {
    color: '#fff',
    fontSize: 15,
    marginHorizontal: 20,
    letterSpacing: 1,
  },
  contador: {
    fontSize: 40,
    textAlign: "right",
    color: '#eda137',
  },
  bottom: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.1,
    width: 360,
    height: 60,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
  },
  avatar: {
    alignContent: 'center',
    alignItems: 'center',
  },
  topper: {
    width: 50,
    height: 50,
  },
});
