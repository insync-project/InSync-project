import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { AppError } from "../../errors";
import {
  iProjectsCreateReturnSchema,
  iProjectsUpdateBodySchema,
} from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchema } from "../../schemas/projects.schemas";

export const updateProjectsService = async (
  payload: iProjectsUpdateBodySchema,
  projectId: string,
  userId: string | undefined
): Promise<iProjectsCreateReturnSchema> => {
  const projectRepo = AppDataSource.getRepository(Project);

  const findProject: Project | null = await projectRepo.findOne({
    where: {
      id: Number(projectId),
    },
    relations: {
      owner: true,
    },
  });

  if (!findProject) {
    throw new AppError("Project not found!", 404);
  } else if (!(findProject.owner.id === Number(userId))) {
    throw new AppError("You don't have permission to change this project", 403);
  }

  const updateProject: Project = projectRepo.create({
    ...findProject,
    ...payload,
  });

  const newProject = await projectRepo.save(updateProject);

  const projectReturn = projectsCreateReturnSchema.parse(newProject);

  return projectReturn;
};
