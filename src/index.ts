import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";

import userRoutes from "./router/user.router.ts";

import apiKeyMiddleware from "./middlewares/apiKey.middleware.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.use(apiKeyMiddleware);

app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500);
  res.json({ error: "Internal Server Error" });
});

app.listen(port);
