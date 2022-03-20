import React, {Component, useState} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Avatar, Tile} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Input, Icon, Button, Picker, Image} from 'react-native-elements';
import Btn from '../component/Btn';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_participantes: 0,
      open: false,
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
          <Text style={styles.Info}>N O M B R E</Text>
        </View>
        <View>
          <Text style={styles.Info}>Carrera</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //fin del drawer!!

  

  render() {
    var done = false;

    const update = numero => {
      this.setState({num_participantes: numero});
    };
    const btn = () => {
      if (!done) {
        console.log('Hecho');
        done = true;
      } else {
        console.log('NO Hecho');
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log('Pressed');
          console.log(xhttp.responseText);

          if (xhttp.responseText > 0) {
            update(xhttp.responseText);
          }
        }
      };
      xhttp.open('GET', 'https://spoiledragon.000webhostapp.com/Cont.php');
      xhttp.send();
    };

    //PANTALLA PRINCIPAL QUE SI SE VE
    return (
      <View style={styles.container}>
        <Tile
          imageSrc={require('../Imagenes/background.png')}
          title="Participantes"
          featured
          caption={this.state.num_participantes}
        />
        <Button
          title="Refresh"
          icon={{
            name: 'fire',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{marginLeft: 10}}
          titleStyle={{fontWeight: '700'}}
          buttonStyle={{
            backgroundColor: 'black',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 500,
            marginHorizontal: 0,
            marginVertical: 10,
          }}
          onPress={btn}
        />

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


  
}



const styles = StyleSheet.create({
  Info: {
    marginTop: 10,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
   
    backgroundColor: 'black',
  },
  animatedBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 10,
  },
  body: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});
