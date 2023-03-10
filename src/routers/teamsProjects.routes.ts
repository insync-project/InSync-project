import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import {
  addTeamsProjectsControllers,
  allowUserTeamsProjectsControllers,
  ownUserRemoveTeamsProjectsControllers,
  removeUserTeamsProjectsControllers,
} from "../controllers/teamsProjects.controllers";

export const teamsRoutes: Router = Router();

teamsRoutes.post(
  "/projects/:projectId",
  tokenValidationMiddleware,
  addTeamsProjectsControllers
);

teamsRoutes.put(
  "/:projectId/users/:userId",
  tokenValidationMiddleware,
  allowUserTeamsProjectsControllers
);

teamsRoutes.delete(
  "/:projectId/users/:userId",
  tokenValidationMiddleware,
  removeUserTeamsProjectsControllers
);

teamsRoutes.delete(
  "/:projectId/users",
  tokenValidationMiddleware,
  ownUserRemoveTeamsProjectsControllers
);
