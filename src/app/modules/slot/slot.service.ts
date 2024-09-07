import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { ISlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (payload: ISlot) => {
  const result = await Slot.create(payload);
  return result;
};

const getSlotsFromDB = async () => {
  const result = await Slot.aggregate([{ $match: { isBooked: false } }]);
  return result;
};

const getSingleSlotFromDB = async (id: string) => {
  const result = await Slot.findById(id);
  return result;
};

const updateSlotIntoDB = async (id: string, payload: Partial<ISlot>) => {
  // --Check if slot exist or not
  const extSlotData: ISlot | null = await Slot.findById(id);

  if (!extSlotData) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot doest not exist!");
  }

  const result = await Slot.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getSlotsFromDB,
  getSingleSlotFromDB,
  updateSlotIntoDB,
};
