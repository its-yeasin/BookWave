import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Room } from "../room/room.model";
import { IBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { CONFIRM_STATUS } from "./booking.constants";

const createBookingIntoDB = async (userId: string, payload: IBooking) => {
  const { date, slots, room } = payload;

  const existingRoom = await Room.findById(room);
  // check if room exist or not
  if (!existingRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  // fetch all slots associated with this date and room
  const slotsWithThisRoom = await Slot.find({
    date,
    room,
  });

  if (!slotsWithThisRoom.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No slots available for this date"
    );
  }

  // check given slots available in this room or not
  const invalidSlots = slots.filter(
    (slotId) => !slotsWithThisRoom.some((item) => item._id.valueOf() === slotId)
  );

  if (invalidSlots.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Slot ID ${invalidSlots.join(", ")} is not available to this room`
    );
  }

  // check if any given slots is already booked or not
  const bookedSlots = slotsWithThisRoom.filter((item) => item.isBooked);

  if (bookedSlots.length) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Given slots ${bookedSlots.map((i) => i._id)?.join(", ")} is already booked`
    );
  }

  // format payload data
  const payloadData: IBooking = {
    date,
    slots,
    room,
    user: new mongoose.Types.ObjectId(userId),
    totalAmount: existingRoom.pricePerSlot * slots?.length,
    isConfirmed: CONFIRM_STATUS.unconfirmed,
    isDeleted: false,
  };

  const result = await Booking.create(payloadData);

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate([
    {
      path: "room",
    },
    {
      path: "slots",
    },
    {
      path: "user",
      select: "-password -__v",
    },
  ]);
  return result;
};

const getOwnBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({
    user: userId,
  })
    .populate([
      {
        path: "room",
      },
      {
        path: "slots",
      },
    ])
    .select("-user");
  return result;
};

const updateBookingIntoDB = async (id: string, isConfirmed: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    {
      isConfirmed,
    },
    { new: true }
  );

  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    { new: true }
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getOwnBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
