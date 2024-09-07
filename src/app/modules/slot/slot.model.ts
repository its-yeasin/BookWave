import mongoose, { Schema } from "mongoose";
import { ISlot, SlotModel } from "./slot.interface";

const slotSchema = new mongoose.Schema<ISlot, SlotModel>(
  {
    name: {
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
    timestamps: true,
  }
);

slotSchema.static("isBooked", async function (id: string) {
  const existingSlot: ISlot | null = await Slot.findById(id);
  return existingSlot?.isBooked;
});

export const Slot = mongoose.model<ISlot, SlotModel>("Slot", slotSchema);
