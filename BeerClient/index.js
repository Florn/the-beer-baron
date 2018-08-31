/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
// import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// Create the client as outlined in the setup guide
// const client = new ApolloClient();

const client = new ApolloClient({
  uri: "http://localhost:8000/"
});

const AppRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent("BeerClient", () => App);
