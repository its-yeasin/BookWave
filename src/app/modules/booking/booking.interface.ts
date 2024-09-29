import { Types } from "mongoose";
import { CONFIRM_STATUS } from "./booking.constants";

export type TConfirmStatus = keyof typeof CONFIRM_STATUS;

export interface IBooking {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: string;
  totalAmount: number;
  isConfirmed: TConfirmStatus;
  isDeleted: boolean;
}
