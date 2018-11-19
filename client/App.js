/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import AppView from "./modules/AppView";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppView style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
