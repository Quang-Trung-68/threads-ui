import * as zod from "zod";

const forgotPasswordSchema = zod.object({
  email: zod.email(),
});

export default forgotPasswordSchema;
