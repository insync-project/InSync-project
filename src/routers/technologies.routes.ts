import { Router } from "express";
import {
  createProjectTechnologiesController,
  createTechnologyController,
  createUserTechnologiesController,
  deleteTechnologyController,
  listAllTechnologiesController,
} from "../controllers/technologies.controllers";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import { validateProjectMiddleware } from "../middlewares/projects/validProject.middleware";

export const technologiesRoutes: Router = Router();

technologiesRoutes.post("", createTechnologyController);
technologiesRoutes.get("", listAllTechnologiesController);
technologiesRoutes.delete("/:techId", deleteTechnologyController);
technologiesRoutes.post(
  "/users",
  tokenValidationMiddleware,
  createUserTechnologiesController
);
technologiesRoutes.post(
  "/projects/:projectId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  createProjectTechnologiesController
);
