import express, { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";

import { router as userRoutes } from "./router/user.router.ts";

import { validateAPIKey } from "./middlewares/apiKey.middleware.ts";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(validateAPIKey);

app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500);
  res.json({ error: "Internal Server Error" });
});

app.listen(port);
