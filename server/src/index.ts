import express
from "express";

import cors
from "cors";

import dotenv
from "dotenv";

import mongoose
from "mongoose";

import {

  ApolloServer

} from "apollo-server-express";

import {

  typeDefs

} from "./graphql/typeDefs";

import {

  resolvers

} from "./graphql/resolvers";

import authRoutes
from "./routes/authRoutes";

import {
  healthCheck
} from "./serverless/health";

import {
  projectDigest
} from "./serverless/projectDigest";


dotenv.config();


const app =
  express();


app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.get(
  "/api/health",
  healthCheck
);

app.get(
  "/api/serverless/project-digest",
  projectDigest
);


mongoose.connect(

  process.env.MONGO_URI
    || ""

).then(() => {

  console.log(
    "MongoDB Connected"
  );

});


async function startServer() {

  const apolloServer =
    new ApolloServer({

      typeDefs,

      resolvers

    });


  await apolloServer.start();


  apolloServer.applyMiddleware({

    app: app as never,

    path: "/graphql"

  });


  app.listen(5001, () => {

    console.log(

      "Server running at http://localhost:5001/graphql"

    );

  });

}


startServer();
