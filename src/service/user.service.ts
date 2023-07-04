import { readFile, writeFile } from "fs/promises";

import path from "path";

import { fileURLToPath } from "url";

import { v4 as uuidv4 } from "uuid";

import User from "../model/user.model.ts";

type UserData = {
  [id: string]: User;
};

export interface IUserService {
  getUser(id?: string): Promise<UserData>;
  createUser(user: User): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<UserData | null>;
  activateUser(id: string): Promise<UserData | null>;
}

export default class UserService implements IUserService {
  constructor(public dbFile: string) {
    this.dbFile = path.resolve(
      fileURLToPath(import.meta.url),
      "../../..",
      dbFile
    );
  }

  async getUserData() {
    const jsonData = await readFile(this.dbFile, "utf8");
    if (jsonData) {
      const data: UserData = JSON.parse(jsonData);
      return data;
    }
    return {};
  }

  async createUser(user: any) {
    const newUser = new User(uuidv4(), user.name, user.age, user.gender);
    this.saveUsers(newUser);
    return newUser;
  }

  async saveUsers(newUser: User) {
    const data = await this.getUserData();

    data[newUser.id] = newUser;

    await writeFile(this.dbFile, JSON.stringify(data));
  }

  async getUser(id?: string) {
    const data = await this.getUserData();
    return id ? { id: data[id] } : data;
  }

  async updateUser(newData: User) {
    const data = await this.getUserData();
    const user = data[newData.id];
    if (user) {
      data[newData.id] = {
        ...user,
        name: newData.name,
        age: newData.age,
        gender: newData.gender,
        modificationTimestamp: new Date(),
      };

      writeFile(this.dbFile, JSON.stringify(data));

      return newData;
    }
    return null;
  }

  async deleteUser(id: string) {
    const data = await this.getUserData();
    const user = data[id];
    if (user) {
      delete data[id];
      await writeFile(this.dbFile, JSON.stringify(data));
      return data;
    }
    return null;
  }

  async activateUser(id: string) {
    const data = await this.getUserData();
    const user = data[id];
    if (user) {
      data[id].status = true;
      await writeFile(this.dbFile, JSON.stringify(data));
      return data;
    }
    return null;
  }
}
