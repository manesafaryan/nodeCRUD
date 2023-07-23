import { Pool } from "pg";

import { User } from "../model/user.model.js";

export interface UserDataAccess {
  createUser(user: User): Promise<User | null>;
  getUsers(id?: string): Promise<User[]>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
  activateUser(id: string): Promise<User | null>;
}

export class UserDataAccessLayer implements UserDataAccess {
  constructor(private readonly pool: Pool) {}

  async createUser(user: User): Promise<User | null> {
    const query = `INSERT INTO users (name, age, gender, status) 
                     VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      user.getName(),
      user.getAge(),
      user.getGender(),
      user.getStatus(),
    ];

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async getUsers(): Promise<User[]> {
    try {
      const result = await this.pool.query("SELECT * FROM users");
      return result.rows;
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  }

  async updateUser(user: User): Promise<User | null> {
    try {
      const query = `UPDATE users 
                      SET name = $1, age = $2, gender = $3, modification_timestamp = NOW()
                      WHERE id = $4 RETURNING *`;
      const values = [user.getName(), user.getAge(), user.getGender()];

      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      const query = `DELETE FROM users 
                      WHERE id = $1 RETURNING *`;
      const values = [id];

      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting user:", error);
      return null;
    }
  }

  async activateUser(id: string): Promise<User | null> {
    try {
      const query = `UPDATE users SET status = true 
                       WHERE id = $1 RETURNING *`;
      const values = [id];

      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error activating user:", error);
      return null;
    }
  }
}
