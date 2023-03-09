import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import {
  iProjectsCreateReturnSchema,
  iProjectsUpdateBodySchema,
} from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchema } from "../../schemas/projects.schemas";

export const updateProjectsService = async (
  payload: iProjectsUpdateBodySchema,
  req: Request
): Promise<iProjectsCreateReturnSchema> => {
  const projectRepo = AppDataSource.getRepository(Project);

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
      team: true,
    },
  });

  const projectReturn = projectsCreateReturnSchema.parse(responseProject);

  return projectReturn;
};
