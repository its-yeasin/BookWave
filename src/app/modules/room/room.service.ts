import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getRoomsFromDB = async () => {
  const result = await Room.aggregate([{ $match: { isDeleted: false } }]);
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  // --Check room delete status
  const isRoomDeleted = await Room.isDeleted(id);
  if (isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  const result = await Room.findById(id);
  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  // const modifiedPayload: Partial<TRoom> = payload;

  // --Check if room exist or not
  const extRoomData: TRoom | null = await Room.findById(id);

  if (!extRoomData) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  // --Check room delete status
  const isRoomDeleted = await Room.isDeleted(id);
  if (isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  // --Check if payload has amenities property or not
  if (payload.amenities && payload.amenities?.length !== 0) {
    // --Check if existing amenities already includes in payload amenities
    const filteredAmenities = extRoomData.amenities.filter(
      (i) => payload.amenities?.indexOf(i) === -1
    );

    // --Modify payload amenities with filtered and and payload amenities
    payload.amenities = [...filteredAmenities, ...payload.amenities];
  }

  const result = await Room.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  // --Check room delete status
  const isRoomDeleted = await Room.isDeleted(id);
  if (isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doest not exist!");
  }

  const result = await Room.findOneAndUpdate(
    {
      _id: id,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
