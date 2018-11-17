import { AsyncStorage } from "react-native";

export const retrieveToken = () => {};

export const getToken = () => {
  return AsyncStorage.getItem("token").then(token => {
    if (token) return token;

    console.log("Retrieving token");
    fetch("http://localhost:8000/api-token-auth/", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ username: "flann", password: "11111111b" }),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    })
      .then(res => {
        console.log("token received", res);
        res.json().then(res => {
          if (res.token) {
            AsyncStorage.setItem("token", res.token);
          }
        });
      })
      .catch(err => {
        console.log("Network error", err);
      });
  });
};
