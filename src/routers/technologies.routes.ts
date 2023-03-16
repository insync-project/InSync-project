import { Router } from "express";
import {
  createProjectTechnologiesController,
  createTechnologyController,
  createUserTechnologiesController,
  deleteTechnologyController,
  listAllTechnologiesController,
  removeProjectTechnologiesController,
  removeUserTechnologiesController,
} from "../controllers/technologies.controllers";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import { validateProjectMiddleware } from "../middlewares/projects/validProject.middleware";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import { addTechSchema } from "../schemas/technologies.schemas";

export const technologiesRoutes: Router = Router();

technologiesRoutes.post("", createTechnologyController);

technologiesRoutes.get("", listAllTechnologiesController);

technologiesRoutes.post(
  "/users",
  tokenValidationMiddleware,
  validateBodyMiddleware(addTechSchema),
  createUserTechnologiesController
);

technologiesRoutes.post(
  "/projects/:projectId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  validateBodyMiddleware(addTechSchema),
  createProjectTechnologiesController
);

technologiesRoutes.delete(
  "/users",
  tokenValidationMiddleware,
  removeUserTechnologiesController
);

technologiesRoutes.delete(
  "/projects/:projectId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  removeProjectTechnologiesController
);

technologiesRoutes.delete("/:techId", deleteTechnologyController);
