import { Request, Response, NextFunction } from "express";
import { IUserService } from "../service/user.service.ts";

export class UserController {
  constructor(private userService: IUserService) {}

  createUser(req: Request, res: Response, next: NextFunction) {
    const payload = req.body;

    try {
      const result = this.userService.createUser(payload);
      res.status(201).send(result);
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).send("internal sever error");
    }
  }

  getUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const result = this.userService.getUser(id);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).send("internal sever error");
    }
  }

  getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = this.userService.getUser();
      res.status(201).send(result);
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).send("internal sever error");
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const payload = req.body;

    try {
      const result = await this.userService.updateUser(payload);
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No such user");
      }
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).send("internal sever error");
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
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
      res.status(500).send("internal sever error");
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
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
      res.status(500).send("internal sever error");
    }
  }
}
