"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Project_1 = __importDefault(require("../models/Project"));
exports.resolvers = {
    Query: {
        projects: async () => {
            return Project_1.default.find()
                .sort({
                createdAt: -1
            });
        }
    },
    Mutation: {
        createProject: async (_parent, args) => {
            const project = await Project_1.default.create({
                name: args.name,
                description: args.description,
                owner: "Deepika"
            });
            return project;
        }
    }
};
