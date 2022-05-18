import React, { Component } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DevSettings } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { lineString as makeLineString } from '@turf/helpers';


import { Button } from 'react-native-elements';
MapboxGL.setAccessToken(
  'sk.eyJ1Ijoic3BvaWxlZHJhZ29uIiwiYSI6ImNsMm90eGliMjAwMGEzZW8zajFydWJmaGEifQ.0dEUyjBc5gk24dAoA6fk3A',
);
export default class Mapa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kilometros: 0,
      codigo: this.props.route.params.pasarCode,
      recordedPath: [],
      currentPoint: null,
      beginpoint: [],
      endpoint: [],
      started: false,
      on_start: false,
      complete: false,
    };
    console.log(this.state.codigo);
  }



  onUserLocationUpdate = (e) => {
    const { longitude, latitude } = e.coords;
    this.setState({
      currentPoint: [longitude, latitude],
    })

    if (this.state.on_start == false && this.state.started == true) {
      this.setState({ beginpoint: this.state.currentPoint });
      console.log(this.state.beginpoint);
      this.setState({ on_start: true });
    }

    if (this.state.on_start == true && this.state.started == false) {
      this.setState({ complete: true });
      this.setState({ on_start: false });
      this.setState({ endpoint: this.state.currentPoint });
      console.log(this.state.endpoint);



      const R = 6371e3; // metres
      const φ1 = this.state.beginpoint[1] * Math.PI / 180; // φ, λ in radians
      const φ2 = this.state.endpoint[1] * Math.PI / 180;
      const Δφ = (this.state.beginpoint[1] - this.state.endpoint[1]) * Math.PI / 180;
      const Δλ = (this.state.endpoint[0] - this.state.beginpoint[0]) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres
      console.log("Metros Recorridos",d)
    }

    //console.log(JSON.stringify(e))
  }

  renderProgressLine = () => {
    if (this.state.started == true) {

      if (!this.state.currentPoint) {
        return null;
      }

      const coords = this.state.recordedPath;
      coords.push(this.state.currentPoint);

      if (coords.length < 2) {
        return null;
      }

      const lineString = makeLineString(coords);

      return (

        <MapboxGL.Animated.ShapeSource id="progressSource" shape={lineString}>
          <MapboxGL.Animated.LineLayer
            id="progressFill"
            style={{
              lineColor: '#314ccd',
              lineWidth: 3,
            }}
          />

        </MapboxGL.Animated.ShapeSource>
        //aqui implementamos lo que ha avanzado
      );
    }
  }


  async componentDidMount() {
    console.log(this.pa);

    //permiso();
    MapboxGL.locationManager.stop();
    MapboxGL.locationManager.start();


    var xhttp = new XMLHttpRequest();
    let _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        _this.setState({ kilometros: xhttp.responseText });
        console.log(_this.state.kilometros);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/Avance.php?codigo=' +
      this.state.codigo,
      true,
    );
    xhttp.send();



  }

  botonsito = () => {

    if (this.state.started == true) {
      this.setState({ started: false });
      console.log("se ha Detenido");
    } else {
      this.setState({ started: true });
      console.log("se ha ha Iniciado");
    }
  }
  render() {



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
          <MapboxGL.UserLocation
            visible={true}
            followUserLocation={true}

          />;

          DevSettings.reload();
        } else {
          console.log('Nope');
        }
      } catch (err) {
        console.warn(err);
      }

    }






    return (


      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          //centerCoordinate={[-90.96, -0.47]}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          onUserLocationUpdate={this.onUserLocationUpdate}
          style={{ flex: 1 }}>
          {this.renderProgressLine()}
          <MapboxGL.UserLocation
            followUserLocation
            onUpdate={this.onUserLocationUpdate}
          />


          <MapboxGL.Camera
            zoomLevel={16}
            //centerCoordinate={[3.33624, 6.57901]}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserLocation
          ></MapboxGL.Camera>

        </MapboxGL.MapView>


        <View style={{ backgroundColor: "white" }}>
          <Text style={{ fontSize: 40, color: '#00e0ff', textAlign: 'center', marginBottom: 20 }}>
            Avance
          </Text>
          <View style={{ marginLeft: 200, width: 120, height: 100 }}>
            <AnimatedCircularProgress
              arcSweepAngle={180}
              rotation={-90}
              size={120}
              width={15}
              fill={this.state.kilometros}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {fill => <Text style={{ color: "black" }}>{this.state.kilometros / 10}  / 10 km</Text>}
            </AnimatedCircularProgress>
          </View>
          <View style={{ marginTop: -100, marginLeft: 50 }}>
            <AnimatedCircularProgress
              arcSweepAngle={180}
              rotation={-90}
              size={120}
              width={15}
              fill={50}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {fill => <Text style={{ color: "black" }}>3 dias / 5 dias</Text>}
            </AnimatedCircularProgress>
          </View>
        </View>
        <Button title={'Ruta'} onPress={this.botonsito} />
        <Button title={'Refresh'} onPress={requestCameraPermission} />
      </View>
    );
  }
}
