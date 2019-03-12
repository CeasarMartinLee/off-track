import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { View, Image, TouchableHighlight } from 'react-native';
import { Container } from 'native-base';
import { Audio } from 'expo'
import Spacer from './Spacer'


const WalkingViewComponent = () => {
  const origin = { latitude: 52.339392, longitude: 4.856258 };
  const destination = { latitude: 52.338894, longitude: 4.856386 };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAqWBhyYy08dnCCA2Uf4Nq8GzHeyZ6NdSU';
  const region = {
    latitude: 52.339306,
    longitude: 4.856268,
    latitudeDelta: 0.0009,
    longitudeDelta: 0.0009,
  };
  const breakpoints = [{ latitude: 52.339666, longitude: 4.855879 }];

  playbackObject = new Audio.Sound()
  playbackObject.loadAsync(require('./Oosterpark.mp3'))

  buttonStop = async () => {
    await playbackObject.stopAsync()
    await playbackObject.unloadAsync()
    await playbackObject.loadAsync(require('./Oosterpark.mp3'))
  }

  buttonPlay = async () => {
    await playbackObject.playAsync()
    await playbackObject.loadAsync(require('./Oosterpark.mp3'))
  }

  buttonPause = async () => {
    await playbackObject.pauseAsync()
  }

  return (
    <Container>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Spacer size={5} />
        <TouchableHighlight onPress={this.buttonPlay}>
          <Image
            style={{ width: 50, height: 50, marginRight: 10 }}
            source={require('./buttons/play.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.buttonPause}>
          <Image
            style={{ width: 50, height: 50, marginRight: 10 }}
            source={require('./buttons/pause.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.buttonStop }>
          <Image
            style={{ width: 50, height: 50, marginRight: 10 }}
            source={require('./buttons/stop.png')}
          />
        </TouchableHighlight>
        <Spacer size={5} />
      </View>
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          mode="walking"
          strokeWidth={3}
          strokeColor="green"
          waypoints={breakpoints}
          followsUserLocation
          showsCompass
          showsMyLocationButton
          loadingEnabled
          optimizeWaypoints
        />
      </MapView>
    </Container>

  );
};
export default WalkingViewComponent;