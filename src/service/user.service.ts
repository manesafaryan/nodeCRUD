import { readFile, writeFile } from "fs/promises";

import { v4 as uuidv4 } from "uuid";

import { User } from "../model/user.model.ts";

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

export class UserService implements IUserService {
  constructor(private dbFile: string) {}

  private async getUserData() {
    const jsonData = await readFile(this.dbFile, "utf8");

    if (jsonData) {
      const data: UserData = JSON.parse(jsonData);
      return data;
    }
    return {};
  }

  private async writeUserData(data: UserData) {
    writeFile(this.dbFile, JSON.stringify(data));
  }

  async createUser(user: any) {
    const newUser = new User(uuidv4(), user.name, user.age, user.gender);
    this.saveUsers(newUser);
    return newUser;
  }

  async saveUsers(newUser: User) {
    const data = await this.getUserData();

    data[newUser.id] = newUser;
    await this.writeUserData(data);
  }

  async getUser(id?: string) {
    const data = await this.getUserData();
    return id ? { id: data[id] } : data;
  }

  async updateUser(newData: User) {
    const data = await this.getUserData();
    const user = data[newData.id];

    if (user) {
      user.name = newData.name;
      user.age = newData.age;
      user.gender = newData.gender;
      user.modificationTimestamp = new Date();

      this.writeUserData(data);
      return newData;
    }
    return null;
  }

  async deleteUser(id: string) {
    const data = await this.getUserData();
    const user = data[id];

    if (user) {
      delete data[id];
      await this.writeUserData(data);
      return data;
    }
    return null;
  }

  async activateUser(id: string) {
    const data = await this.getUserData();
    const user = data[id];

    if (user) {
      data[id].status = true;
      await this.writeUserData(data);
      return data;
    }
    return null;
  }
}
