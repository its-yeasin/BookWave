import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";

type TZodError = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};

const handleZodError = (err: ZodError): TZodError => {
  const statusCode = 400;
  const message = "Zod validation error!";
  const errorSources: TErrorSource = err?.issues?.map((issue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
