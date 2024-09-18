import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { CONFIRM_STATUS } from "./booking.constants";

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
    totalAmount: {
      type: Number,
      required: true,
    },
    isConfirmed: {
      type: String,
      required: true,
      enum: Object.keys(CONFIRM_STATUS),
    },
    isDeleted: {
      type: Boolean,
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

bookingSchema.pre("findOneAndUpdate", async function (next) {
  const existingBooking = await Booking.findById(this.getQuery()._id);
  if (!existingBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "No booking found!");
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
      select: "-password -__v",
    },
  ]);
});

export const Booking = mongoose.model("Booking", bookingSchema);
