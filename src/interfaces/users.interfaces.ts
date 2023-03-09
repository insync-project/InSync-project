import { z } from "zod";
import {
  createUserSchema,
  returnFullCreateUserSchema,
} from "../schemas/users.schemas";

export type ICreateUser = z.infer<typeof createUserSchema>;
export type IReturnCreateUserFull = z.infer<typeof returnFullCreateUserSchema>;
