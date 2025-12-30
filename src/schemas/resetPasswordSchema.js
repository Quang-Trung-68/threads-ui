import * as zod from "zod";

const resetPasswordSchema = zod
  .object({
    token: zod.string().min(1),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "password_mismatch",


    path: ["password_confirmation"],
  });


export default resetPasswordSchema;
