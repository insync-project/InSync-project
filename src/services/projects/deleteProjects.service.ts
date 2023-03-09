import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { AppError } from "../../errors";

export const deleteProjectService = async (req: Request): Promise<void> => {
  const projectRepo = AppDataSource.getRepository(Project);

  const project: Project | null = await projectRepo.findOne({
    where: {
      id: Number(req.params.projectId),
    },
    relations: {
      owner: true,
    },
  });

  if (!project) {
    throw new AppError("Project not found!", 404);
  } else if (!(project.owner.id === Number(req.userTokenInfos.id))) {
    throw new AppError("You don't have permission to delete this project", 403);
  }

  await projectRepo.softRemove(project!);
};
