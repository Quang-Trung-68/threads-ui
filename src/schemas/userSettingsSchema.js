import * as zod from "zod";

const userSettingsSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  username: zod.string().min(3, "Username must be at least 3 characters"),
  bio: zod.string().optional(),
  avatar: zod.any().optional(), // Can be a File or a string URL
  is_private: zod.boolean().default(false),
});

export default userSettingsSchema;
