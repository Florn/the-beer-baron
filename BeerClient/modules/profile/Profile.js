import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Query, ApolloConsumer } from "react-apollo";
export default class Profile extends Component {
  render() {
    return (
      <ApolloConsumer>
        <View style={{ flex: 1 }}>
          <Text>Profile</Text>
        </View>
      </ApolloConsumer>
    );
  }
}
