/** @format */

import React, { Fragment } from "react";
import { AppRegistry, AsyncStorage } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ApolloProvider, withApollo } from "react-apollo";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { getToken } from "./modules/services/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/"
});

const middlewareLink = setContext(() => {
  getToken().then(token => {
    const jwtToken = `JWT ${token}`;
    console.log(jwtToken);
    return {
      headers: {
        authorization: jwtToken
      }
    };
  });
});

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
});

const AppRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent("BeerClient", () => AppRoot);
