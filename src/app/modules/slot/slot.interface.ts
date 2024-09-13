import { Model, Types } from "mongoose";

export interface ISlot {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SlotModel extends Model<ISlot> {
  isBooked(id: string): boolean;
  isStartTimeSmallerThanExtEndTime(date: string, startTime: string): boolean;
  isRoomExist(roomId: Types.ObjectId): boolean;
}
