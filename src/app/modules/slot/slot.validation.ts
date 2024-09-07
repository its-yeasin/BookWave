import { z } from "zod";
import dayjs from "dayjs";

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
      name: z
        .string({
          invalid_type_error: "Slot Name field must be in string",
        })
        .min(3, "Slot name should be minimum 3 characters!")
        .max(20, "Slot name can be maximum 20 characters!")
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
        const startTime = dayjs(`2000-01-01T${body.startTime}`);
        const endTime = dayjs(`2000-01-01T${body.endTime}`);

        // --Check if endTime is smaller than startTime
        return !endTime.isBefore(startTime);
      },
      {
        message: "End time must be greater that Start time",
      }
    ),
});

const createSlotValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "required!",
          invalid_type_error: "Slot Name field must be in string",
        })
        .min(3, "Slot name should be minimum 3 characters!")
        .max(20, "Slot name can be maximum 20 characters!"),
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
        const startTime = dayjs(`2000-01-01T${body.startTime}`);
        const endTime = dayjs(`2000-01-01T${body.endTime}`);

        // --Check if endTime is smaller than startTime
        return !endTime.isBefore(startTime);
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
