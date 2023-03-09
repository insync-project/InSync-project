import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { iProjectsCreateReturnSchema } from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchema } from "../../schemas/projects.schemas";
import { AppError } from "../../errors";

export const retrieveProjectService = async (
  req: Request
): Promise<iProjectsCreateReturnSchema> => {
  const projectsRepo = AppDataSource.getRepository(Project);

  const projectsResult: Project | null = await projectsRepo.findOne({
    where: {
      id: Number(req.params.projectId),
    },
    relations: {
      projectTechnologies: {
        technology: true,
      },
      owner: true,
      team: true,
    },
  });

  if (!projectsResult) {
    throw new AppError("Project not found!", 404);
  }

  const projectParse: iProjectsCreateReturnSchema =
    projectsCreateReturnSchema.parse(projectsResult);

  return projectParse;
};
