import { TErrorSource } from "../interface/interface.error";
import mongoose from "mongoose";

type TError = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};

const handlerValidationError = (
  err: mongoose.Error.ValidationError
): TError => {
  const statusCode = 400;
  const message = err.message || "Validation error";
  const errorSources: TErrorSource = Object.values(err.errors)?.map(
    (vError: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: vError.path,
        message: vError.message,
      };
    }
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlerValidationError;
