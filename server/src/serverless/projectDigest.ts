import type {
  Request,
  Response
} from "express";

import Project from "../models/Project";

export const projectDigest = async (
  _req: Request,
  res: Response
) => {
  const [total, active] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({
        status: "Active"
      })
    ]);

  res.json({
    total,
    active,
    generatedAt: new Date().toISOString()
  });
};
