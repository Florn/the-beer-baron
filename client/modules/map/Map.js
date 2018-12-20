import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import MapView from "react-native-maps";

export default class Map extends Component {
  state = { marginBottom: 1 };
  onMapReady = () => this.setState({ marginBottom: 0 });
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        /> */}
        <MapView
          style={{ flex: 1, marginBottom: this.state.marginBottom }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation
          rotateEnabled={false}
          showsCompass={false}
          showsMyLocationButton
          onMapReady={this.onMapReady}
        />
      </View>
    );
  }
}
