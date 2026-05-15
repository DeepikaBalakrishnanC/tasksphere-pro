import mongoose
from "mongoose";


const projectSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Active"
    },

    owner: {
      type: String
    }

  },

  {
    timestamps: true
  }

);


export default mongoose.model(
  "Project",
  projectSchema
);