import Project
from "../models/Project";

type CreateProjectArgs = {
  name: string;
  description: string;
};

export const resolvers = {

  Query: {

    projects: async () => {

      return Project.find()
        .sort({
          createdAt: -1
        });

    }

  },


  Mutation: {

    createProject:
      async (
        _parent: unknown,
        args: CreateProjectArgs
      ) => {

        const project =
          await Project.create({

            name:
              args.name,

            description:
              args.description,

            owner:
              "Deepika"

          });

        return project;

      }

  }

};
