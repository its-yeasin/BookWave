import { z } from "zod";

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Room Name is required!",
        invalid_type_error: "Room Name must be string",
      })
      .min(3, "Room name should be minimum 3 characters!")
      .max(20, "Room name can be maximum 20 characters!")
      .optional(),
    roomNo: z
      .number({
        required_error: "Room number is required!",
        invalid_type_error: "Room number must be in number",
      })
      .min(1, "Room number should be minimum 1")
      .optional(),
    floorNo: z
      .number({
        required_error: "Floor number is required!",
        invalid_type_error: "Floor number must be in number",
      })
      .min(1, "Floor number should be minimum 1")
      .optional(),
    capacity: z
      .number({
        required_error: "Room capacity is required!",
        invalid_type_error: "Room capacity must be in number",
      })
      .min(1, "Room capacity should be minimum 1")
      .optional(),
    amenities: z
      .array(
        z.string({
          required_error: "Amenity is required!",
          invalid_type_error: "Amenity must be string",
        }),
        {
          required_error: "Amenity is required!",
          invalid_type_error: "Amenity must be an array",
        }
      )
      .optional(),
    isDelete: z
      .boolean({
        invalid_type_error: "isDeleted property should be in boolean format!",
      })
      .optional(),
  }),
});

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Room Name is required!",
        invalid_type_error: "Room Name must be string",
      })
      .min(3, "Room name should be minimum 3 characters!")
      .max(20, "Room name can be maximum 20 characters!"),
    roomNo: z
      .number({
        required_error: "Room number is required!",
        invalid_type_error: "Room number must be in number",
      })
      .min(1, "Room number should be minimum 1"),
    floorNo: z
      .number({
        required_error: "Floor number is required!",
        invalid_type_error: "Floor number must be in number",
      })
      .min(1, "Floor number should be minimum 1"),
    capacity: z
      .number({
        required_error: "Room capacity is required!",
        invalid_type_error: "Room capacity must be in number",
      })
      .min(1, "Room capacity should be minimum 1"),
    amenities: z.array(
      z.string({
        required_error: "Amenity is required!",
        invalid_type_error: "Amenity must be string",
      }),
      {
        required_error: "Amenity is required!",
        invalid_type_error: "Amenity must be an array",
      }
    ),
    isDelete: z
      .boolean({
        invalid_type_error: "isDeleted property should be in boolean format!",
      })
      .optional(),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
