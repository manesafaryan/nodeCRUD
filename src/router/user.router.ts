import express from "express";

import userController from "../controller/index.ts";

import { validateID } from "../middlewares/idValidation.middleware.ts";
import { validateUser } from "../middlewares/userValidation.middleware.ts";

export const router = express.Router();

router.get("/:id", validateID, userController.getUser);
router.get("/", userController.getUsers);
router.post("/", validateUser, userController.createUser);
router.put("/:id", validateID, userController.updateUser);
router.delete("/:id", validateID, userController.deleteUser);
router.patch("/:id/activate", validateID, userController.activateUser);
