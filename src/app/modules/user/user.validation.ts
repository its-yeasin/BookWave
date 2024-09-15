import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string",
      })
      .min(3),
    email: z
      .string({
        required_error: "Name is required!",
      })
      .email({
        message: "Invalid email!",
      }),
    password: z
      .string({
        required_error: "Password is required!",
      })
      .min(4, "Password should be minimum 4 character long"),
    phone: z.string({
      required_error: "Phone number is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
    role: z.enum(["user", "admin"]),
  }),
});

export const userValidations = {
  userValidationSchema,
};
