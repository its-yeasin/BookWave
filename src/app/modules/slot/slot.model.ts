import mongoose, { Schema } from "mongoose";
import { ISlot, SlotModel } from "./slot.interface";
import { convertTimeToTimestamp } from "./slot.utils";
import { Room } from "../room/room.model";

const slotSchema = new mongoose.Schema<ISlot, SlotModel>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

slotSchema.static("isBooked", async function (id: string) {
  const existingSlot: ISlot | null = await Slot.findById(id);
  return existingSlot?.isBooked;
});

slotSchema.static(
  "isStartTimeSmallerThanExtEndTime",
  async function (date: string, startTime: string) {
    // find existing slots with params date
    const extSlot: ISlot[] = await Slot.find({
      date,
    });

    // check if any slot endTime is greater than payload startTime
    const isExist =
      extSlot?.filter((i) => {
        return (
          convertTimeToTimestamp(startTime) < convertTimeToTimestamp(i.endTime)
        );
      })?.length > 0;

    return isExist;
  }
);

slotSchema.static("isRoomExist", async function (roomId: string) {
  return !!(await Room.findById(roomId));
});

export const Slot = mongoose.model<ISlot, SlotModel>("Slot", slotSchema);
