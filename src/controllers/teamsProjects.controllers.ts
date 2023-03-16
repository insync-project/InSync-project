import { Request, Response } from "express";
import { addTeamsProjectsService } from "../services/teams/addTeamsProjects.service";
import { allowUserTeamsProjectsService } from "../services/teams/updateTeamsProjects.service";
import { removeUserTeamsProjectsService } from "../services/teams/removeTeamsProjects.service";
import { ownUserRemoveTeamsProjectsService } from "../services/teams/ownUserRemoveTeamsProjects.service";

export const addTeamsProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const addedTeams = await addTeamsProjectsService(req);

  return res.status(201).json({ message: addedTeams });
};

export const allowUserTeamsProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedTeams = await allowUserTeamsProjectsService(req);

  return res.status(200).json({ message: updatedTeams });
};

export const removeUserTeamsProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await removeUserTeamsProjectsService(req);

  return res.status(204).send();
};

export const ownUserRemoveTeamsProjectsControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await ownUserRemoveTeamsProjectsService(req);

  return res.status(204).send();
};
