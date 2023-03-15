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
  retrieveProjectControllers,
  updateProjectsControllers,
} from "../controllers/projects.controllers";
import { validateProjectMiddleware } from "../middlewares/projects/validProject.middleware";

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  "",
  tokenValidationMiddleware,
  validateBodyMiddleware(projectsCreateSchema),
  createProjectsControllers
);

projectsRoutes.get("", retrieveAllProjectsControllers);

projectsRoutes.get(
  "/:projectId",
  tokenValidationMiddleware,
  retrieveProjectControllers
);

projectsRoutes.patch(
  "/:projectId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  validateBodyMiddleware(projectsUpdateSchema),
  updateProjectsControllers
);

projectsRoutes.delete(
  "/:projectId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  deleteProjectsControllers
);
