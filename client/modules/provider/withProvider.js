import React from "react";
import { ApolloProvider } from "react-apollo";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const localClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export const withProvider = (Component, client = localClient) => {
  return class extends React.Component {
    static options = Component.options;

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
