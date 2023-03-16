import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import {
  iProjectsCreateReturnSchema,
  iProjectsUpdateBodySchema,
} from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchema } from "../../schemas/projects.schemas";
import { AppError } from "../../errors";

export const updateProjectsService = async (
  payload: iProjectsUpdateBodySchema,
  req: Request
): Promise<iProjectsCreateReturnSchema> => {
  const projectRepo = AppDataSource.getRepository(Project);

  if (req.projectInfos.status === "Finalizado") {
    throw new AppError("Unable to make changes to a finished project!", 400);
  }

  const updateProject: Project = projectRepo.create({
    ...req.projectInfos,
    ...payload,
  });

  const newProject = await projectRepo.save(updateProject);

  const responseProject: Project | null = await projectRepo.findOne({
    where: {
      id: newProject.id,
    },
    relations: {
      projectTechnologies: {
        technology: true,
      },
      owner: true,
      team: {
        user: true,
      },
    },
  });

  const projectReturn = projectsCreateReturnSchema.parse(responseProject);

  return projectReturn;
};
