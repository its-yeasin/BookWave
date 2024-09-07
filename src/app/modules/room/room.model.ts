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
    timestamps: true,
  }
);

// roomSchema.pre("findOneAndUpdate", async function (next) {
//   const query = this.getQuery();
//   const existingRoom: TRoom | null = await Room.findById(query);

//   if (!existingRoom || existingRoom.isDeleted) {
//     throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
//   }

//   next();
// });

roomSchema.static("isDeleted", async function (id: string) {
  const existingRoom: TRoom | null = await Room.findById(id);
  return existingRoom?.isDeleted;
});

export const Room = mongoose.model<TRoom, RoomModel>("Room", roomSchema);
