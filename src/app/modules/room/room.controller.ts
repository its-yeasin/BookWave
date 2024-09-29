import { NextFunction, Request, Response } from "express";
import { RoomServices } from "./room.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomServices.createRoomIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Room added successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomServices.getRoomsFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rooms retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await RoomServices.getSingleRoomFromDB(req.params?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Room retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomServices.updateRoomIntoDB(
      req.params?.id,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Room updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomServices.deleteRoomFromDB(req.params?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Room deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const RoomControllers = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
