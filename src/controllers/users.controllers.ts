import { Request, Response } from "express";
import {
  ICreateUser,
  ILoginBody,
  ILoginReturn,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { loginService } from "../services/users/loginUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: ICreateUser = req.body;

  const newUser: ILoginReturn = await createUsersService(body);

  return res.status(201).json({ ...newUser });
};

export const loginUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: ILoginBody = req.body;
  const response: ILoginReturn = await loginService(loginData);
  return res.status(200).json({ ...response });
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const userId: number = parseInt(req.params.id);
  // await deleteUsersService(userId);
  return res.status(204).send();
};
