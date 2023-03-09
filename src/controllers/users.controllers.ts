import { Request, Response } from "express";
import { User } from "../entities";
import {
  ICreateUser,
  ILoginBody,
  IReturnCreateUserFull,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { loginService } from "../services/users/loginUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: ICreateUser = req.body;

  const newUser: IReturnCreateUserFull = await createUsersService(body);

  return res.status(201).json({ ...newUser });
};

export const loginUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: ILoginBody = req.body;
  const response: string = await loginService(loginData);
  return res.status(200).json({ token: response });
};
