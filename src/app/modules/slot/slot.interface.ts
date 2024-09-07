import { Model, Types } from "mongoose";

export interface ISlot {
  name: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SlotModel extends Model<ISlot> {
  isBooked(id: string): boolean;
}
