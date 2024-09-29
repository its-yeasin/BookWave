import { ZodError } from "zod";
import { TErrorSource } from "../interface/interface.error";

type TZodError = {
  statusCode: number;
  message: string;
  errorMessages: TErrorSource;
};

const handleZodError = (err: ZodError): TZodError => {
  const statusCode = 400;

  const message =
    err?.issues?.map((issue) => issue.message)?.toString() ||
    "Validation error!";
  const errorMessages: TErrorSource = err?.issues?.map((issue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleZodError;
