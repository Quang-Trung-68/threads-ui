import * as zod from "zod";

const registerSchema = zod
  .object({
    username: zod.string().min(1).max(20),
    email: zod.email(),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Password do not match with password confirmation",
    path: ["password_confirmation"],
  });

export default registerSchema;
