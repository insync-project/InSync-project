import { z } from "zod";
import {
  createUserSchema,
  returnFullCreateUserSchema,
  returnRegisterSchema,
  returnUserProfile,
  updateUserSchema,
  userLoginSchema,
} from "../schemas/users.schemas";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type ILoginBody = z.infer<typeof userLoginSchema>;

export type IRegisterReturn = z.infer<typeof returnRegisterSchema>;

export type IUpdateUser = z.infer<typeof updateUserSchema>;

export type IReturnUser = z.infer<typeof returnFullCreateUserSchema>;

export type iReturnUserByNickname = z.infer<typeof returnUserProfile>;
