import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  loginUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import { validateUniqueRegisterMiddleware } from "../middlewares/users/validateUniqueRegister.middlewares";
import {
  createUserSchema,
  updateUserSchema,
  userLoginSchema,
} from "../schemas/users.schemas";

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

usersRoutes.delete("/:id", tokenValidationMiddleware, deleteUserController);

usersRoutes.patch(
  "/:id",
  tokenValidationMiddleware,
  validateBodyMiddleware(updateUserSchema),
  updateUsersController
);
