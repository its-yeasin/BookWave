import { NextFunction, Request, Response } from "express";
import { SlotServices } from "./slot.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SlotServices.createSlotIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slot added successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SlotServices.getSlotsFromDB(req.query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slots retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SlotServices.getSingleSlotFromDB(req.params?.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slot retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SlotServices.updateSlotIntoDB(
      req.params?.id,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Slot updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const SlotControllers = {
  createSlot,
  getAllSlot,
  getSingleSlot,
  updateSlot,
};
