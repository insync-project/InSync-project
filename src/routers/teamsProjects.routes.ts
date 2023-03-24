import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import {
  addTeamsProjectsControllers,
  allowUserTeamsProjectsControllers,
  removeUserTeamsProjectsControllers,
} from "../controllers/teamsProjects.controllers";
import { validateProjectMiddleware } from "../middlewares/projects/validProject.middleware";

export const teamsRoutes: Router = Router();

teamsRoutes.post(
  "/projects/:projectId",
  tokenValidationMiddleware,
  addTeamsProjectsControllers
);

teamsRoutes.put(
  "/:projectId/users/:userId",
  tokenValidationMiddleware,
  validateProjectMiddleware,
  allowUserTeamsProjectsControllers
);

teamsRoutes.delete(
  "/:projectId/users/:userId",
  tokenValidationMiddleware,
  removeUserTeamsProjectsControllers
);
