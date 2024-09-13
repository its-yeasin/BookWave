import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { ISlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { formatTime, timeToMinutes } from "./slot.utils";

const createSlotIntoDB = async (payload: ISlot) => {
  const { room, date, startTime, endTime } = payload;

  if (!(await Slot.isRoomExist(room))) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  if (await Slot.isStartTimeSmallerThanExtEndTime(date, startTime)) {
    throw new AppError(409, "Time already taken");
  }

  // destructure startHour and startMinute from payload startTime
  const [startHour, startMinute] = startTime.split(":").map((i) => Number(i));

  // Converted start and end time minutes
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // empty array to store all slots data according given times
  const slots = [];

  // calculate total slots according to given times
  const totalSlots = Math.floor((endMinutes - startMinutes) / 60);

  // loop according to total time slots
  for (let i = 0; i < totalSlots; i += 1) {
    // store payload data to a variable
    const newPayload = { ...payload };

    const newStartHour = formatTime(startHour + i);
    const newMinute = formatTime(startMinute);
    const newEndHour = formatTime(startHour + i + 1);

    // set new start time
    newPayload.startTime = [newStartHour, newMinute].join(":");

    //set new end time
    newPayload.endTime = [newEndHour, newMinute].join(":");

    // push new data to slots array
    slots.push(newPayload);
  }
  const result = await Slot.create(slots);
  return result;
};

const getSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query;
  const newQuery: {
    date?: string;
    room?: string;
  } = {};

  if (date) {
    newQuery.date = date as string;
  }
  if (roomId) {
    newQuery.room = roomId as string;
  }

  const result = await Slot.find({ isBooked: false, ...newQuery }).populate(
    "room"
  );
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
