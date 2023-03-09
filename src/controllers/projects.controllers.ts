import { Request, Response } from "express";
import { iProjectsCreateSchema } from "../interfaces/projects.interfaces";
import { createProjectsService } from "../services/projects/createProjects.service";

export const createProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectsInfo: iProjectsCreateSchema = req.body;
  const userId: string | undefined = req.userTokenInfos.id;

  const createdProject = await createProjectsService(projectsInfo, userId);

  return res.status(201).json(createdProject);
};
