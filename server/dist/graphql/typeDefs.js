"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `

  type Project {

    id: ID!

    name: String!

    description: String!

    status: String!

    owner: String

  }


  type Query {

    projects: [Project!]!

  }


  type Mutation {

    createProject(

      name: String!

      description: String!

    ): Project!

  }

`;
