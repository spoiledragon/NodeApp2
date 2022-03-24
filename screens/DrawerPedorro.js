import React, {Component, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {Avatar, Tile} from 'react-native-elements';
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
import {Input, Icon, Button, Picker, Image, Card} from 'react-native-elements';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_participantes: 0,
      open: false,
      NombreP: '',
      centroP: '',
      IdP: '',
    };
  }

  //drawwer!!
  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  drawerContent = () => {
    //AQUI ES EL DRAWER EQUIS DE
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a6c5b871-65d8-4396-a2eb-06146905a4b4/deypz5r-9714fd9c-a859-49c8-9303-aa3061a601b2.png/v1/fill/w_1024,h_512,q_80,strp/spoiled_by_dragoneitorgb_deypz5r-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYTZjNWI4NzEtNjVkOC00Mzk2LWEyZWItMDYxNDY5MDVhNGI0XC9kZXlwejVyLTk3MTRmZDljLWE4NTktNDljOC05MzAzLWFhMzA2MWE2MDFiMi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jwBu-zboveYJavFY5yF3bTtguiX1nGVDsvOqTHGpUds',
            }}
          />
          <Text style={styles.Info}>{this.state.NombreP}</Text>
          <Text style={styles.Info}>{this.state.IdP}</Text>
          <Text style={styles.Info}>{this.state.centroP}</Text>
          <Text style={styles.Info}>{this.state.num_participantes}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //fin del drawer!!

  //PANTALLA PRINCIPAL QUE SI SE VE
  render() {
    const users = [
      {
        name: 'Spoiled',
        avatar: 'https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/1366_2000.jpeg',
      },
      {
        name: 'Krystal',
        avatar:
          'https://scontent.fgdl10-1.fna.fbcdn.net/v/t39.30808-6/277169460_627688334989775_1979254251867421709_n.jpg?stp=dst-jpg_p552x414&_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHBuKE0eIeEVITpJDyOcwtm5P6u3dYsu_Hk_q7d1iy78WbLjsqqfrpbZXx5XXMQYmGtxOvJ2GCXTLqMY0kwK0ft&_nc_ohc=QTfJEhZ8ZiAAX_3iMBX&tn=LwYmHrA9cqHQm4E9&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT_yYv0k5-Z_tfG_lNO_FVOSezWNKW4xGDQO-hd49ngg7w&oe=62429171',
      },
      {
        name: 'Marco',
        avatar: 'https://i.pinimg.com/550x/72/df/30/72df30b8b200848e492625ef95dd2e50.jpg',
      },
    ];

    return (
      <View style={styles.container}>
      
        <Tile
          imageSrc={require('../Imagenes/background.png')}
          title="Participantes"
          featured
          caption={this.state.num_participantes}
        />

        <Card containerStyle={styles.containerCard}>
          <Card.Title style={styles.cardtitle}>Top 3</Card.Title>
          {users.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                <Avatar size={64} rounded source={{uri: u.avatar}} />
                <Text style={styles.Infocard}>{u.name}</Text>
              </View>
            );
          })}
        </Card>
        <MenuDrawer
          open={this.state.open}
          position={'right'}
          drawerContent={this.drawerContent()}
          drawerPercentage={70}
          animationTime={250}
          overlay={true}
          opacity={0.4}>
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text style={styles.Info}>Open</Text>
          </TouchableOpacity>
        </MenuDrawer>
      </View>
    );
  }
  // Funciones

  TraeDatos = async () => {
    let _this = this;
    const jsonValue = await AsyncStorage.getItem('@UserKeys');
    var datau = JSON.parse(jsonValue);
    console.log('se ha guardado', datau);
    //conexcion al servidor
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Datos = xhttp.responseText;
        console.log(Datos);
        var arr = Datos.split(',');
        _this.setState({NombreP: arr[0]});
        _this.setState({IdP: arr[1]});
        _this.setState({centroP: arr[0]});
        _this.setState({num_participantes: arr[3]});
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/Cont.php?cod=' + datau,
    );
    xhttp.send();
  };

  componentDidMount() {
    this.TraeDatos();
  }
}
//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyItems: 'center',
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
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  containerCard: {
    width: 350,
    backgroundColor: 'black',
    borderColor:"black"
  },
  cardtitle: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  Infocard: {
    color: 'white',
    padding: 20,
  },
});
