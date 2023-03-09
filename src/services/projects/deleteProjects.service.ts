import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";

export const deleteProjectService = async (req: Request): Promise<void> => {
  const projectRepo = AppDataSource.getRepository(Project);

  await projectRepo.softRemove(req.projectInfos!);
};
