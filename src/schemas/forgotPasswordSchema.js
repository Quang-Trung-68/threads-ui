import * as zod from "zod";

const forgotPasswordSchema = zod.object({
  email: zod.string().email(),
});


export default forgotPasswordSchema;
