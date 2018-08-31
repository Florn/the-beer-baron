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
    flexDirection: "row"
  },
  emailInputContainer: {
    marginTop: 5,
    height: 40,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row"
  },
  passwordInputContainer: {
    marginTop: 5,
    height: 40,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row"
  },
  nameInput: {
    height: "100%",
    width: "48%",
    marginHorizontal: "1%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  emailInput: {
    height: "100%",
    width: "100%",
    marginHorizontal: "1%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  },
  passwordInput: {
    height: "100%",
    width: "100%",
    marginHorizontal: "1%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    justifyContent: "center"
  }
});
