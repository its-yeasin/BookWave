import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import { configs } from "../../config";

const userSchema = new mongoose.Schema<TUser>({
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
});

// hash password before save to DB
userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(configs.jwt_access_secret)
    );
    this.password = hashedPassword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
});

export const User = mongoose.model("User", userSchema);
