import { z } from "zod";
import {
  createUserSchema,
  returnFullCreateUserSchema,
  userLoginSchema,
} from "../schemas/users.schemas";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type IReturnCreateUserFull = z.infer<typeof returnFullCreateUserSchema>;
export type ILoginBody = z.infer<typeof userLoginSchema>;
