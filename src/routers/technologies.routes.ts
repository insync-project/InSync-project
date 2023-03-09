import { Router } from "express";
import { createTechnologyController, deleteTechnologyController, listAllTechnologiesController } from "../controllers/technologies.controllers";


export const technologiesRoutes: Router = Router();

technologiesRoutes.post("", createTechnologyController)
technologiesRoutes.get("", listAllTechnologiesController)
technologiesRoutes.delete("/:techId", deleteTechnologyController)

