import { UserDataAccess } from "../data/user-data-access.layer.ts";
import { User } from "../model/user.model.ts";

type UserResult = {
  success: true;
  data: Promise<User | null>;
};

type UserErrorResult = {
  success: false;
  error: unknown; //chnage this
};

export interface IUserService {
  getUser(id?: string): Promise<User[]>;
  createUser(user: IUser): Promise<UserResult | UserErrorResult>;
  updateUser(user: IUser): Promise<UserResult | UserErrorResult>;
  deleteUser(id: string): Promise<UserResult>;
  activateUser(id: string): Promise<UserResult>;
}

interface IUser {
  age: number;
  name: string;
  gender: string;
}

export class UserService {
  constructor(private readonly dataAccess: UserDataAccess) {}

  async createUser({
    name,
    age,
    gender,
  }: IUser): Promise<UserResult | UserErrorResult> {
    try {
      const user = new User();
      user.setName(name!);
      user.setAge(age!);
      user.setGender(gender!);
      user.setStatus(false);
      return {
        success: true,
        data: this.dataAccess.createUser(user),
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }

  async getUser(id?: string): Promise<User[]> {
    return this.dataAccess.getUsers(id);
  }

  async updateUser({ name, age, gender }: IUser) {
    try {
      const user = new User();
      user.setName(name!);
      user.setAge(age!);
      user.setGender(gender!);
      user.setModificationTimestamp(new Date());
      return {
        success: true,
        data: this.dataAccess.createUser(user),
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }

  async deleteUser(id: string) {
    return {
      success: true,
      data: this.dataAccess.deleteUser(id),
    };
  }

  async activateUser(id: string) {
    return {
      success: true,
      data: this.dataAccess.activateUser(id),
    };
  }
}
