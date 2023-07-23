import { UserDataAccess } from "../data/user-data-access.layer.ts";
import { User } from "../model/user.model.ts";

export interface IUserService {
  getUser(id?: string): Promise<User[]>;
  createUser(user: IUser): Promise<User | null>;
  updateUser(user: IUser): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
  activateUser(id: string): Promise<User | null>;
}

interface IUser {
  age: number;
  name: string;
  gender: string;
}

export class UserService {
  constructor(private readonly dataAccess: UserDataAccess) {}

  async createUser({ name, age, gender }: IUser): Promise<User | null> {
    const user = new User();
    user.setName(name!);
    user.setAge(age!);
    user.setGender(gender!);
    user.setStatus(false);
    return this.dataAccess.createUser(user);
  }

  async getUser(id?: string): Promise<User[]> {
    return this.dataAccess.getUsers(id);
  }

  async updateUser({ name, age, gender }: IUser): Promise<User | null> {
    const user = new User();
    user.setName(name!);
    user.setAge(age!);
    user.setGender(gender!);
    user.setModificationTimestamp(new Date());
    return this.dataAccess.updateUser(user);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.dataAccess.deleteUser(id);
  }

  async activateUser(id: string): Promise<User | null> {
    return this.dataAccess.activateUser(id);
  }
}
