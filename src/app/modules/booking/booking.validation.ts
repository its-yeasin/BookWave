import { z } from "zod";

// Date validation: YYYY-MM-DD format
const dateSchema = z.string().refine(
  (date) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // "YYYY-MM-DD"
    return regex.test(date);
  },
  {
    message: "Date must be in YYYY-MM-DD format",
  }
);

const createBookingValidationSchema = z.object({
  body: z.object({
    date: dateSchema,
    slots: z
      .array(z.string())
      .min(1, { message: "At least one slot is required" }),
    room: z.string({
      required_error: "Room is required",
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
