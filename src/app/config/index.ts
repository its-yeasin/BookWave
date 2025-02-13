import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const configs = {
  isDev: process.env.NODE_ENV === "development",
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  salt_round: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
