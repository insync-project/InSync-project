import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import { projectsCreateSchema } from "../schemas/projects.schemas";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import { createProjectsControllers } from "../controllers/projects.controllers";

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  "",
  validateBodyMiddleware(projectsCreateSchema),
  tokenValidationMiddleware,
  createProjectsControllers
);
