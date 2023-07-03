import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { name, age, gender } = req.body;

  if (!name || !age || !gender) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  next();
};
