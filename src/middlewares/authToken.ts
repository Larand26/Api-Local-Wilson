import type { NextFunction, Request, Response } from "express";

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.API_TOKEN;

  if (!expectedToken) {
    return res
      .status(500)
      .json({ success: false, error: "API token not configured" });
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Token missing" });
  }

  const token = authHeader.slice(7);

  if (token !== expectedToken) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }

  return next();
};

export default authToken;
