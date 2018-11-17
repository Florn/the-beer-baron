// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require("graphql-yoga");

const mongo = require("mongodb");

MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "beerDatabase";

async function createMongoClient() {
  const client = await MongoClient.connect(
    url,
    { useNewUrlParser: true }
  );
  return client;
}

const prepare = o => {
  o._id = o._id.toString();
  return o;
};

const start = async () => {
  try {
    const client = await createMongoClient();
    const db = client.db(dbName);
    const UsersCollection = await db.collection("users");

    const typeDefs = `
      type User {
        _id: String
        firstName: String
        lastName: String
      }
      type Query {
        users: [User],
        user(_id: String): User
      }
    `;

    const resolvers = {
      Query: {
        users: async () => {
          return (await UsersCollection.find({}).toArray()).map(prepare);
        },
        user: async (parent, { _id }) => {
          return prepare(await UsersCollection.findOne(mongo.ObjectId(_id)));
        }
      }
    };

    const server = new GraphQLServer({ typeDefs, resolvers });
    server.start(() => console.log("Server is running on localhost:4000"));
  } catch (e) {
    console.log(e);
  }
};
start();
