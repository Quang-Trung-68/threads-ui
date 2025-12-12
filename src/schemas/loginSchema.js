import * as zod from "zod";

const loginSchema = zod.object({
  login: zod.email(),
  password: zod.string().min(8),
});

export default loginSchema;
