import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

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

bookingSchema.pre("save", async function (next) {
  // update booking status before creating booking
  const isBooked = await Slot.updateMany(
    {
      _id: {
        $in: this.slots,
      },
    },
    {
      isBooked: true,
    }
  );

  if (!isBooked.modifiedCount) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error on creating booking!"
    );
  }

  next();
});

bookingSchema.post("save", async function (doc) {
  await doc.populate([
    {
      path: "room",
    },
    {
      path: "slots",
    },
    {
      path: "user",
      select: "-password",
    },
  ]);
});

export const Booking = mongoose.model("Booking", bookingSchema);
