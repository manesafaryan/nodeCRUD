import { Request, Response, NextFunction } from "express";

export function validateAPIKey (req: Request, res: Response, next: NextFunction) {
  const API_KEY = process.env.API_KEY;
  const reqApiKey = req.headers["api-key"];
  
  if (reqApiKey && reqApiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
