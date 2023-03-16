import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { AppError } from "../../errors";

export const validateProjectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const projectRepo = AppDataSource.getRepository(Project);

  if (isNaN(Number(req.params.projectId))) {
    throw new AppError("Project not found!", 404);
  }

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
    throw new AppError(
      `You don't have permission to ${req.method.toLowerCase()} this project`,
      403
    );
  }

  req.projectInfos = project;

  return next();
};
