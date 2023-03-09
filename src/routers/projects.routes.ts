import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import {
  projectsCreateSchema,
  projectsUpdateSchema,
} from "../schemas/projects.schemas";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import {
  createProjectsControllers,
  deleteProjectsControllers,
  retrieveAllProjectsControllers,
  updateProjectsControllers,
} from "../controllers/projects.controllers";

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  "",
  validateBodyMiddleware(projectsCreateSchema),
  tokenValidationMiddleware,
  createProjectsControllers
);

projectsRoutes.get("", retrieveAllProjectsControllers);

projectsRoutes.patch(
  "/:projectId",
  validateBodyMiddleware(projectsUpdateSchema),
  tokenValidationMiddleware,
  updateProjectsControllers
);

projectsRoutes.delete(
  "/:projectId",
  tokenValidationMiddleware,
  deleteProjectsControllers
);
