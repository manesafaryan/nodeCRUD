import { readFile, writeFile } from "fs/promises";

import path from "path";

import { fileURLToPath } from "url";

import { v4 as uuidv4 } from "uuid";

import User from "../model/user.model.ts";

export interface IUserService {
  getUser(id?: string): Promise<User[]> | Promise<User>; // change this
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<User>;
  activateUser(id: string): Promise<User>;
}

export default class UserService implements IUserService {
  constructor(public dbFile: string) {
    this.dbFile = path.resolve(fileURLToPath(import.meta.url), dbFile);
  }

  async getUserData() {
    const jsonData = await readFile(this.dbFile, "utf8");
    const data = JSON.parse(jsonData);
    return data;
  }

  async createUser(user: any) {
    const newUser = new User(uuidv4(), user.name, user.age, user.gender);
    this.saveUsers(newUser);
    return newUser;
  }

  async saveUsers(newUser: User) {
    const data = await this.getUserData();

    data.push(newUser);

    writeFile(this.dbFile, data);
  }

  async getUser(userId?: String) {
    const data = await this.getUserData();
    return data.filter(({ id }: User) => userId === id);
  }

  async updateUser({ id, name, age, gender, status }: User) {
    const data = await this.getUserData();
    const newData = data.map((data: User) =>
      data.id === id ? data : { ...data, id, name, age, gender, status }
    );

    writeFile(this.dbFile, newData);

    return newData;
  }

  async deleteUser(id: String) {
    const data = await this.getUserData();
    const newData = data.filter(({ id: userId }: User) => userId === id);

    writeFile(this.dbFile, newData);

    return newData;
  }

  async activateUser(id: String) {
    const data = await this.getUserData();
    const newData = data.map((data: User) => ({
      ...data,
      status: data.id === id ? true : data.status,
    }));

    writeFile(this.dbFile, newData);

    return newData;
  }
}
