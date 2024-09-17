import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, body } = req;
  try {
    const result = await BookingServices.createBookingIntoDB(
      user?.userId as string,
      body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking added successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Available bookings retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getOwnBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingServices.getOwnBookingsFromDB("email");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingServices.updateBookingIntoDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookingServices.updateBookingIntoDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getOwnBookings,
  updateBooking,
  deleteBooking,
};
