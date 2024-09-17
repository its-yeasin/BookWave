import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Slot",
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
