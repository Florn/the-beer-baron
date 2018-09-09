/** @format */

import React, { Fragment } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ApolloProvider, withApollo } from "react-apollo";
// import ApolloClient from "apollo-boost";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const AppRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent("BeerClient", () => AppRoot);
