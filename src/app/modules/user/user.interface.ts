import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
}

export interface UserModel extends Model<IUser> {
  isValidUser(email: string): Promise<IUser>;
  isPasswordValid(plainPassword: string, hashedPassword: string): boolean;
}
