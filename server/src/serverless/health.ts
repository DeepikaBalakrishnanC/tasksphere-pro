import type {
  Request,
  Response
} from "express";

export const healthCheck = (
  _req: Request,
  res: Response
) => {
  res.json({
    ok: true,
    service: "tasksphere-api",
    timestamp: new Date().toISOString()
  });
};
