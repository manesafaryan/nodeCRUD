import { config } from "dotenv";

import path from "path";

import { UserController } from "./user.controller.ts";

import { UserService } from "../../src/service/user.service.ts";

config();

const userController = new UserController(
  new UserService(path.resolve(process.env.DB_FILE_PATH ?? ""))
);

export default userController;
