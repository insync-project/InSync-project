import { Request, Response, Router } from "express";
import {
  createUsersController,
  loginUsersController,
} from "../controllers/users.controllers";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import { validateUniqueRegisterMiddleware } from "../middlewares/users/validateUniqueRegister.middlewares";
import { createUserSchema, userLoginSchema } from "../schemas/users.schemas";
import { AppDataSource } from "../data-source";
import { Project, User } from "../entities";

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

usersRoutes.get("", async (req: Request, res: Response): Promise<Response> => {
  const projectRepo = AppDataSource.getRepository(User);

  const realEstateResult: User | null = await projectRepo.findOne({
    where: {
      id: Number(1),
    },
    relations: {
      userTechnologies: {
        technology: true,
      },
      socialMedia: true,
      project: true,
    },
  });

  return res.status(200).json(realEstateResult);
});
