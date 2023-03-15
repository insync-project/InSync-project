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

export const technologiesRoutes: Router = Router();

technologiesRoutes.post("", createTechnologyController);

technologiesRoutes.get("", listAllTechnologiesController);

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
