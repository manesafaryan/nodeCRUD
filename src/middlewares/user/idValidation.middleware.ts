import { Request, Response, NextFunction } from "express";

export function validateID(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is missing" });
  }

  next();
}
