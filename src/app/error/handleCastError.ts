import mongoose from "mongoose";
import { TErrorSource, TGenericResponse } from "../interface/interface.error";

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const errorMessages: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessages,
  };
};

export default handleCastError;
