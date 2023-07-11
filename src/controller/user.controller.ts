import { Request, Response, NextFunction } from "express";

import { IUserService } from "../service/user.service.ts";

export class UserController {
  constructor(private userService: IUserService) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const result = await this.userService.createUser(payload);
      res.status(201).send(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const result = await this.userService.getUser(id);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getUser();
      res.status(201).send(result);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.params.id;

    try {
      const result = await this.userService.updateUser({ ...payload, id });
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const result = await this.userService.deleteUser(id);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  activateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const result = await this.userService.activateUser(id);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
}
