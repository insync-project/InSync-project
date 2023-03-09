import { Request, Response } from "express";
import { User } from "../entities";
import {
  ICreateUser,
  IReturnCreateUserFull,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: ICreateUser = req.body;

  const newUser: IReturnCreateUserFull = await createUsersService(body);

  return res.status(201).json({ ...newUser });
};
