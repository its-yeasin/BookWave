import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "./user.interface";
import { configs } from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
  },
  {
    versionKey: false,
  }
);

// hash password before save to DB
userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(configs.salt_round)
    );
    this.password = hashedPassword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
});

userSchema.static("isValidUser", async function isValidUser(email: string) {
  return await User.findOne({ email });
});

userSchema.static(
  "isPasswordValid",
  async function (plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
);

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
