import gql from "graphql-tag";

const allMessagesQuery = {
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
};
