import { Response } from "express";
import httpStatus from "http-status";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // response set globally if no data is retrieved from DB or DB is empty
  if (Array.isArray(data?.data) && !data?.data?.length) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No data found",
      data: [],
    });
  } else {
    res.status(data.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data,
    });
  }
};

export default sendResponse;
