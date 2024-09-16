import { Types } from "mongoose";

export interface IBooking {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
}
