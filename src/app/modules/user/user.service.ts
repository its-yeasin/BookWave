import { IUser } from "./user.interface";
import { User } from "./user.model";
import { excludePasswordField } from "./user.utils";

const createUserIntoDB = async (payload: IUser) => {
  const insertedUserData = await User.create(payload);

  const userData = excludePasswordField(insertedUserData as IUser);

  return userData;
};

export const UserServices = {
  createUserIntoDB,
};
