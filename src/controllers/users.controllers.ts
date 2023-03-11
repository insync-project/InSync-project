import { Request, Response } from "express";
import {
  ICreateUser,
  ILoginBody,
  IRegisterReturn,
  IReturnUser,
  IUpdateUser,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { deleteUsersService } from "../services/users/deleteUsers.service";
import { loginService } from "../services/users/loginUsers.service";
import { updateUsersService } from "../services/users/updateUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: ICreateUser = req.body;

  const newUser: IRegisterReturn = await createUsersService(body);

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

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUsersService(req);
  return res.status(204).send();
};

export const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: IUpdateUser = req.body;
  const response = await updateUsersService(req, body);
  return res.status(200).json({ ...response });
};
