import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./Registration.styles";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";

// const REGISTER_USER = gql`
//   mutation CreateCustomer(
//     $firstName: String
//     $secondName: String
//     $email: String
//     $password: String
//   ) {
//     createCustomer(
//       email: $email
//       password: $password
//       firstName: $firstName
//       secondName: $secondName
//     ) {
//       customer {
//         id
//         firstName
//         secondName
//         email
//         password
//       }
//       formErrors
//     }
//   }
// `;
const REGISTER_USER = gql`
  mutation {
    createMessage(message: "create message") {
      message {
        id
        creationDate
      }
      formErrors
    }
  }
`;

export default class Registration extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: null,
      secondName: null,
      email: null,
      password: null
    };
  }

  updateUserDetails = (detail, input) => {
    this.setState({
      [detail]: input
    });
  };

  renderMutation = client => {
    let input;
    debugger;
    return (
      <Mutation mutation={REGISTER_USER}>
        {(addTodo, { data }) => (
          <View style={styles.signupFieldsContainer}>
            <View style={styles.nameInputsContainer}>
              <TextInput
                style={styles.nameInput}
                value={this.state.firstName}
                placeholder={"first name..."}
                onChangeText={input =>
                  this.updateUserDetails("firstName", input)
                }
              />
              <TextInput
                style={styles.nameInput}
                value={this.state.secondName}
                placeholder={"second name..."}
                onChangeText={input =>
                  this.updateUserDetails("secondName", input)
                }
              />
            </View>
            <View style={styles.emailInputContainer}>
              <TextInput
                style={styles.emailInput}
                value={this.state.email}
                placeholder={"email..."}
                onChangeText={input => this.updateUserDetails("email", input)}
              />
            </View>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                value={this.state.password}
                placeholder={"password..."}
                onChangeText={input =>
                  this.updateUserDetails("password", input)
                }
              />
            </View>
            <View style={styles.registerButtonContainer}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  debugger;
                  addTodo({
                    variables: {
                      firstName: this.state.firstName,
                      secondName: this.state.secondName,
                      email: this.state.email,
                      password: this.state.password
                    }
                  })
                    .then(response => {
                      console.log("Response", response);
                    })
                    .catch(error => {
                      console.log("Apollo error", error);
                    });
                }}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Mutation>
    );
  };

  registerUser = addTodo => {
    console.log(addTodo);
    addTodo({
      variables: {
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(nonError => console.log("nonOrror", nonError))
      .catch(nonError => console.log("error", nonError));
  };

  render() {
    console.log("Registration", this);
    return (
      <ApolloConsumer>{client => this.renderMutation(client)}</ApolloConsumer>
    );
  }
}
