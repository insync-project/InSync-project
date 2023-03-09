import { Router } from "express";
import {
  createUsersController,
  loginUsersController,
} from "../controllers/users.controllers";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import { validateUniqueRegisterMiddleware } from "../middlewares/users/validateUniqueRegister.middlewares";
import { createUserSchema, userLoginSchema } from "../schemas/users.schemas";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateBodyMiddleware(createUserSchema),
  validateUniqueRegisterMiddleware,
  createUsersController
);
usersRoutes.post(
  "/login",
  validateBodyMiddleware(userLoginSchema),
  loginUsersController
);
