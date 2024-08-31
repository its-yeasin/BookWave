import mongoose from "mongoose";
import { configs } from "./app/config";
import app from "./app";

const main = async () => {
  try {
    const connection = await mongoose.connect(configs.database_url as string);
    if (connection) {
      app.listen(configs.port, () => {
        console.log("listening to port", configs.port);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

main();
