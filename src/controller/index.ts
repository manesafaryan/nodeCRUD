import { UserController } from "./user.controller.ts";

import UserService from "../../src/service/user.service.ts";

const userController = new UserController(new UserService("db/userData.json"));

export default userController;
