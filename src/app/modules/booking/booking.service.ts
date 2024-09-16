import { IBooking } from "./booking.interface";

const createBookingIntoDB = async (payload: IBooking) => {
  return payload;
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
