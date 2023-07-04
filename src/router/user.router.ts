import express from "express";

import userController from "../controller/index.ts";

import idValidationMiddleware from "../middlewares/idValidation.middleware.ts";
import userValidationMiddleware from "../middlewares/userValidation.middleware.ts";

const router = express.Router();

router.get("/:id", idValidationMiddleware, userController.getUser);
router.get("/", userController.getUsers);
router.post("/", userValidationMiddleware, userController.createUser);
router.put("/:id", idValidationMiddleware, userController.updateUser);
router.delete("/:id", idValidationMiddleware, userController.deleteUser);
router.patch("/:id/activate", idValidationMiddleware, userController.activateUser);

export default router;
