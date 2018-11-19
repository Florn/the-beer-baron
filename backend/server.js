const { GraphQLServer } = require("graphql-yoga");
const mongo = require("mongodb");
MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const { verifyJWTToken, createJWToken } = require("./modules/auth/authorise");
const gql = require("graphql-tag");
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

    const typeDefs = gql`
      type User {
        _id: String
        firstName: String
        lastName: String
        email: String
        jwt: String
      }
      type Query {
        users: [User]
        user(_id: String): User
      }
      type Mutation {
        createUser(
          firstName: String
          lastName: String
          email: String
          password: String
        ): User
      }
    `;

    const resolvers = {
      Query: {
        users: async () => {
          return (await UsersCollection.find({}).toArray()).map(prepare);
        },
        user: async (parent, { _id }) => {
          console.log("Server", _id);
          return prepare(await UsersCollection.findOne(mongo.ObjectId(_id)));
        }
      },
      Mutation: {
        createUser: async (root, args, context, info) => {
          const res = await UsersCollection.insert(args);

          return prepare(
            await UsersCollection.findOne({ _id: res.insertedIds[0] })
          );
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
