import { Request, Response } from "express";
import {
  iProjectsCreateReturnSchemaArray,
  iProjectsCreateSchema,
  iProjectsUpdateBodySchema,
} from "../interfaces/projects.interfaces";
import { createProjectsService } from "../services/projects/createProjects.service";
import { updateProjectsService } from "../services/projects/updateProjects.service";
import { deleteProjectService } from "../services/projects/deleteProjects.service";
import { retrieveAllProjectsService } from "../services/projects/retrieveAllProjects.service";
import { retrieveProjectService } from "../services/projects/retrieveProject.service";

export const createProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectsInfo: iProjectsCreateSchema = req.body;
  const userId: string | undefined = req.userTokenInfos.id;

  const createdProject = await createProjectsService(projectsInfo, userId);

  return res.status(201).json(createdProject);
};

export const retrieveAllProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allProjects: iProjectsCreateReturnSchemaArray =
    await retrieveAllProjectsService();

  return res.status(200).json(allProjects);
};

export const retrieveProjectControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project = await retrieveProjectService(req);

  return res.status(200).json(project);
};

export const updateProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectsInfo: iProjectsUpdateBodySchema = req.body;

  const updatedProject = await updateProjectsService(projectsInfo, req);

  return res.status(200).json(updatedProject);
};

export const deleteProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteProjectService(req);

  return res.status(204).send();
};
