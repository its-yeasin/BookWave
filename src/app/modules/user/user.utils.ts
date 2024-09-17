import { Types } from "mongoose";
import { IUser } from "./user.interface";

interface IUserData extends IUser {
  _id?: Types.ObjectId;
}

export const excludePasswordField = (userData: IUserData) => {
  const newUserData = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    address: userData.address,
  };
  return newUserData;
};
