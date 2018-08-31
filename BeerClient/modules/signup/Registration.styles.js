import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  signupFieldsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  },
  nameInputsContainer: {
    height: 40,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  emailInputContainer: {
    marginTop: 5,
    height: 40,
    width: Dimensions.get("window").width * 0.9
  },
  passwordInputContainer: {
    marginTop: 5,
    height: 40,
    width: Dimensions.get("window").width * 0.9
  },
  registerButtonContainer: {
    marginTop: 5,
    height: 40,
    width: Dimensions.get("window").width * 0.9
  },
  nameInput: {
    height: "100%",
    width: "49%",
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  emailInput: {
    height: "100%",
    width: "100%",
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  passwordInput: {
    height: "100%",
    width: "100%",
    paddingLeft: 5,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  registerButton: {
    height: "100%",
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  registerButtonText: { color: "gray", alignSelf: "center", fontSize: 17 }
});
