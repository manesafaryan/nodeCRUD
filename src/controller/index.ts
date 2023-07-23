import { config } from "dotenv";

import pkg from "pg";

import { UserController } from "./user.controller.ts";

import { UserService } from "../../src/service/user.service.ts";
import { UserDataAccessLayer } from "../data/user-data-access.layer.ts";
import { dbConfig } from "../config/db.config.ts";

config();

const { Pool } = pkg;
const dbPool = new Pool(dbConfig);

export const userController = new UserController(
  new UserService(new UserDataAccessLayer(dbPool))
);
