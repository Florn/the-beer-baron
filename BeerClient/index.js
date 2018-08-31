/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/"
});

client
  .query({
    query: gql`
      {
        allMessages(last: 19) {
          edges {
            node {
              id
              message
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result))
  .catch(result => console.log(result));

const AppRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent("BeerClient", () => App);
