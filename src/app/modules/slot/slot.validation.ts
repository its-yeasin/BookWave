import { z } from "zod";
import { convertTimeToTimestamp } from "./slot.utils";

const dateSchema = z.string().refine(
  (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // "YYYY-MM-DD"
    const result = regex.test(date);

    return result;
  },
  {
    message: "Date must be in YYYY-MM-DD format",
  }
);

const startTimeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    const result = regex.test(time);

    return result;
  },
  {
    message: "Start time must be in HH:MM format",
  }
);

const endTimeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    const result = regex.test(time);

    return result;
  },
  {
    message: "End time must be in HH:MM format",
  }
);

const updateSlotValidationSchema = z.object({
  body: z
    .object({
      room: z
        .string({
          required_error: "required!",
          invalid_type_error: "Room field must be in string",
        })
        .optional(),
      date: dateSchema,
      startTime: startTimeSchema,
      endTime: endTimeSchema,
      isBooked: z
        .boolean({
          invalid_type_error: "isBooked property should be boolean!",
        })
        .optional(),
    })
    .refine(
      (body) => {
        // --Check if endTime is smaller than startTime
        return (
          convertTimeToTimestamp(body.endTime) >
          convertTimeToTimestamp(body.startTime)
        );
      },
      {
        message: "End time must be greater that Start time",
      }
    ),
});

const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string({
        required_error: "required!",
        invalid_type_error: "Room field must be in string",
      }),
      date: dateSchema,
      startTime: startTimeSchema,
      endTime: endTimeSchema,
      isBooked: z
        .boolean({
          invalid_type_error: "isBooked property should be boolean!",
        })
        .optional(),
    })
    .refine(
      (body) => {
        // --Check if endTime is smaller than startTime
        return (
          convertTimeToTimestamp(body.endTime) >
          convertTimeToTimestamp(body.startTime)
        );
      },
      {
        message: "End time must be greater that Start time",
      }
    ),
});

export const SlotValidations = {
  createSlotValidationSchema,
  updateSlotValidationSchema,
};
