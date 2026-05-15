import { gql }
from "apollo-server-express";


export const typeDefs = gql`

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