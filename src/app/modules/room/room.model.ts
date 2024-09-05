import mongoose from "mongoose";
import { TRoom } from "./room.interface";

const roomSchema = new mongoose.Schema<TRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    roomNo: {
      type: Number,
      required: true,
      unique: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model("Room", roomSchema);
