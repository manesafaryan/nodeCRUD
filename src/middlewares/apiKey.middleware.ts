import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

export default (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api-key"];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
