import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })
    .trim(),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
  // role: z
  //  .enum(["USER", "PREMIUM", "ADMIN"], { required_error: "You must have a role" })
  //  .default("USER"),
  token: z.string().optional(),
});
