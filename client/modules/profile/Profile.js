import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { retrieveItem } from "../storage";

import { Header, Card, Button } from "react-native-elements";

const GET_USER = gql`
  query user($_id: String) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export default class Profile extends Component {
  constructor(props) {
    super();

    this.state = {
      userId: null
    };
  }
  componentDidMount = async () => {
    const userId = await retrieveItem("userId");
    this.setState({
      userId
    });
    console.log("userId", userId);
  };

  renderQuery = client => {
    return (
      <Query query={GET_USER} variables={{ _id: this.state.userId }}>
        {({ loading, data }) => {
          if (loading) return null;
          return (
            <View style={{ flex: 1 }}>
              <Card title={`Hello ${data.user.firstName}`}>
                <Text style={{ marginBottom: 10 }}>
                  Its time to drink some motherfucking beer, yo.
                </Text>
                <Button
                  icon={{ name: "code" }}
                  backgroundColor="#03A9F4"
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                  }}
                  title="BUY BEER"
                />
              </Card>
            </View>
          );
        }}
      </Query>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <ApolloConsumer>{client => this.renderQuery(client)}</ApolloConsumer>
      </View>
    );
  }
}
