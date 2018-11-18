import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { styles } from "./Registration.styles";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { goHome } from "../navigation/navigation";
import { AsyncStorage } from "react-native";

const CREATE_USER = gql`
  mutation createUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
    }
  }
`;

export default class Registration extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  }

  getInputData = field => {
    return [
      { title: "First Name", property: "firstName" },
      { title: "Last Name", property: "lastName" },
      { title: "Email", property: "email" },
      { title: "Password", property: "password" }
    ];
  };

  updateUserDetails = (detail, input) => {
    this.setState({
      [detail]: input
    });
  };

  renderForm = () => {
    const forms = this.getInputData();
    return forms.map(form => {
      return (
        <View key={form.property} style={{ marginHorizontal: 20 }}>
          <FormLabel>{form.title}</FormLabel>
          <FormInput
            onChangeText={input => this.updateUserDetails(form.property, input)}
            inputStyle={{ width: Dimensions.get("window").width * 0.95 }}
          />
        </View>
      );
    });
  };

  renderMutation = client => {
    let input;
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { data, loading, error }) => (
          <View>
            <View>{this.renderForm()}</View>
            <View>
              <Button
                buttonStyle={styles.registerButton}
                title={loading ? "" : "Register"}
                loading={loading}
                onPress={() => {
                  createUser({
                    variables: {
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email: this.state.email,
                      password: this.state.password
                    }
                  })
                    .then(response => {
                      AsyncStorage.setItem(
                        "userId",
                        response.data.createUser._id.toString()
                      );
                      goHome();

                      console.log("Response", response);
                    })
                    .catch(error => {
                      console.log("Apollo error", error);
                    });
                }}
              >
                <Text style={styles.registerButtonText} />
              </Button>
            </View>
          </View>
        )}
      </Mutation>
    );
  };

  render() {
    return (
      <ApolloConsumer>{client => this.renderMutation(client)}</ApolloConsumer>
    );
  }
}
