import { z } from "zod";
import {
  createUserSchema,
  returnFullCreateUserSchema,
  returnLoginSchema,
  updateUserSchema,
  userLoginSchema,
} from "../schemas/users.schemas";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type ILoginBody = z.infer<typeof userLoginSchema>;

export type ILoginReturn = z.infer<typeof returnLoginSchema>;

export type IUpdateUser = z.infer<typeof updateUserSchema>;

export type IReturnUser = z.infer<typeof returnFullCreateUserSchema>;
