/** @format */

import React, { Fragment } from "react";
import { Navigation } from "react-native-navigation";
import { AsyncStorage } from "react-native";
import App from "./App";
// import { name as appName } from "./app.json";
import { ApolloProvider, withApollo, Query } from "react-apollo";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { getToken } from "./modules/services/auth";
import { registerScreens } from "./modules/navigation/screens";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
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
Navigation.registerComponent(
  `navigation.playground.WelcomeScreen`,
  () => AppRoot
);
registerScreens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});
