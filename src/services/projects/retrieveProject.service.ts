import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import {
  iProjectReturnNewTeam,
  iProjectsCreateReturnSchema,
  iReturnTeamProjectsWaiting,
} from "../../interfaces/projects.interfaces";
import {
  projectReturnNewTeam,
  projectsCreateReturnSchema,
} from "../../schemas/projects.schemas";
import { AppError } from "../../errors";

export const retrieveProjectService = async (
  req: Request
): Promise<iProjectReturnNewTeam> => {
  const projectsRepo = AppDataSource.getRepository(Project);

  console.log(req.params.projectId);

  const projectsResult = await projectsRepo
    .createQueryBuilder("projects")
    .leftJoinAndSelect("projects.owner", "owner")
    .leftJoinAndSelect("projects.projectTechnologies", "projectTechnologies")
    .leftJoinAndSelect("projectTechnologies.technology", "technology")
    .leftJoinAndSelect("projects.team", "team")
    .leftJoinAndSelect("team.user", "userTeam")
    .where("projects.id = :projectId", {
      projectId: Number(req.params.projectId),
    })
    .getOne();

  if (!projectsResult) {
    throw new AppError("Project not found!", 404);
  }

  const projectParse: iProjectsCreateReturnSchema =
    projectsCreateReturnSchema.parse(projectsResult);

  const teamWaitingTrue: iReturnTeamProjectsWaiting = [];
  const teamWaitingFalse: iReturnTeamProjectsWaiting = [];

  projectParse.team.forEach((element) => {
    if (element.waiting) {
      teamWaitingTrue.push(element);
    } else {
      teamWaitingFalse.push(element);
    }
  });

  const newProjectTeam: iProjectReturnNewTeam = projectReturnNewTeam.parse({
    ...projectParse,
    teamWaitingFalse,
    teamWaitingTrue,
  });

  return newProjectTeam;
};
