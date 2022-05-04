import React, {Component} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {DevSettings} from 'react-native';

import {Button} from 'react-native-elements';
MapboxGL.setAccessToken(
  'sk.eyJ1Ijoic3BvaWxlZHJhZ29uIiwiYSI6ImNsMm90eGliMjAwMGEzZW8zajFydWJmaGEifQ.0dEUyjBc5gk24dAoA6fk3A',
);
export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    //permiso();
    MapboxGL.locationManager.stop();
    MapboxGL.locationManager.start();

  }

  render() {
    const permiso = async => {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'PERMISO LOCALIZACION',
            message: 'PERIMISO LOCALIZACON ' + 'POSICION EN EL MAPA',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (error) {
        console.warn(error);
      }
    };

    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'PERMISO LOCALIZACION',
            message: 'PERIMISO LOCALIZACON ' + 'POSICION EN EL MAPA',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('you can do the thing');

          <MapboxGL.UserLocation followUserLocation={true} />;
          
          DevSettings.reload();
        } else {
          console.log('Nope');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    return (
      <View style={{flex: 1, height: '100%', width: '100%'}}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[-90.96, -0.47]}
          style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[3.33624, 6.57901]}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserLocation
            ></MapboxGL.Camera>
        </MapboxGL.MapView>
        <Button title={'Refresh'} onPress={requestCameraPermission} />
      </View>
    );
  }
}
