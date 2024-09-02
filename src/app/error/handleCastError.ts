import mongoose from "mongoose";
import { TErrorSource, TGenericResponse } from "../interface/interface.error";

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const regex = /"([^"]+)"/;
  const match: string[] = err.message.match(regex) as string[];

  const statusCode = 400;
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: `${match[1] as string} is already exist!`,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
