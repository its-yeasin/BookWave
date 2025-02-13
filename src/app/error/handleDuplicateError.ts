/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericResponse } from "../interface/interface.error";

const handleDuplicateError = (err: any): TGenericResponse => {
  const statusCode = 400;

  const regex = /{[^:]+:\s*([^}]+)}/;
  const element = err.message.match(regex)[0];

  const errorMessages: TErrorSource = [
    {
      path: "",
      message: `${element} is already exist!`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate error",
    errorMessages,
  };
};

export default handleDuplicateError;
