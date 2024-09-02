/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericResponse } from "../interface/interface.error";

const handleDuplicateError = (err: any): TGenericResponse => {
  const statusCode = 400;

  const regex = /"([^"]*)"/;
  const element = err.message.match(regex)[0];

  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${element} is already exist!`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate error",
    errorSources,
  };
};

export default handleDuplicateError;
