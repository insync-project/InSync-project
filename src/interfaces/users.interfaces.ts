import { z } from "zod";
import {
  createUserSchema,
  returnLoginSchema,
  userLoginSchema,
} from "../schemas/users.schemas";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type ILoginBody = z.infer<typeof userLoginSchema>;

export type ILoginReturn = z.infer<typeof returnLoginSchema>;
