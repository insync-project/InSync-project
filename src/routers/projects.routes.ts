import { Request, Response, Router } from "express";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middlewares";
import {
  projectsCreateReturnSchema,
  projectsCreateSchema,
  projectsUpdateSchema,
} from "../schemas/projects.schemas";
import { tokenValidationMiddleware } from "../middlewares/global/validateToken.middleware";
import {
  createProjectsControllers,
  updateProjectsControllers,
} from "../controllers/projects.controllers";
import { Project } from "../entities";
import { AppDataSource } from "../data-source";

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  "",
  validateBodyMiddleware(projectsCreateSchema),
  tokenValidationMiddleware,
  createProjectsControllers
);

projectsRoutes.patch(
  "/:projectId",
  validateBodyMiddleware(projectsUpdateSchema),
  tokenValidationMiddleware,
  updateProjectsControllers
);

projectsRoutes.get(
  "",
  async (req: Request, res: Response): Promise<Response> => {
    const projectRepo = AppDataSource.getRepository(Project);

    const realEstateResult: Project | null = await projectRepo.findOne({
      where: {
        id: Number(1),
      },
      relations: {
        projectTechnologies: {
          technology: true,
        },
        owner: true,
        team: true,
      },
    });

    const parse = projectsCreateReturnSchema.parse(realEstateResult);

    return res.status(200).json(parse);
  }
);
