import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const insertedUserData = await User.create(payload);

  const newUserData = {
    _id: insertedUserData._id,
    name: insertedUserData.name,
    email: insertedUserData.email,
    phone: insertedUserData.phone,
    role: insertedUserData.role,
    address: insertedUserData.address,
  };

  return newUserData;
};

export const UserServices = {
  createUserIntoDB,
};
