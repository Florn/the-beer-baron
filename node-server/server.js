// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require("graphql-yoga");

MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "beerDatabase";

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, client) {
    console.log("Connected successfully to server");

    // const db = client.db(dbName);

    // findDocuments(db, function() {
    //   client.close();
    // });
  }
);

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("users");
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    // assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const typeDefs = `
  type User {
    id: Int!
    firstName: String
    lastName: String
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
