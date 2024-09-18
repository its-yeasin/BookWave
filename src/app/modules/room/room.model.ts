import mongoose from "mongoose";
import { RoomModel, TRoom } from "./room.interface";

const roomSchema = new mongoose.Schema<TRoom, RoomModel>(
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
    pricePerSlot: {
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
    versionKey: false,
  }
);

roomSchema.static("isRoomExist", async function (id: string) {
  const existingRoom: TRoom | null = await Room.findById(id);
  return existingRoom;
});

export const Room = mongoose.model<TRoom, RoomModel>("Room", roomSchema);
