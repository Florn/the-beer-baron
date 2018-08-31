import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { styles } from "./Registration.styles";

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

  render() {
    return (
      <View style={styles.signupFieldsContainer}>
        <View style={styles.nameInputsContainer}>
          <TextInput
            style={styles.nameInput}
            value={this.state.firstName}
            placeholder={"first name..."}
            onChangeText={input => this.updateUserDetails("firstName", input)}
          />
          <TextInput
            style={styles.nameInput}
            value={this.state.secondName}
            placeholder={"second name..."}
            onChangeText={input => this.updateUserDetails("secondName", input)}
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
            onChangeText={input => this.updateUserDetails("password", input)}
          />
        </View>
      </View>
    );
  }
}
