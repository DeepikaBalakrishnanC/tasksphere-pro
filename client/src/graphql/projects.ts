import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      owner
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      id
      name
      description
      status
      owner
    }
  }
`;
