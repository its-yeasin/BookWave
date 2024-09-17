import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Room } from "../room/room.model";
import { IBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (userId: string, payload: IBooking) => {
  const { date, slots, room } = payload;

  // check if room exist or not
  if (!(await Room.findById(room))) {
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
  const payloadData = {
    userId,
    ...payload,
  };

  const result = await Booking.create(payloadData);

  return result;
};

const getAllBookingsFromDB = async () => {
  return [{}];
};

const getOwnBookingsFromDB = async (email: string) => {
  return email;
};

const updateBookingIntoDB = async (id: string) => {
  return id;
};

const deleteBookingFromDB = async (id: string) => {
  return id;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getOwnBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
