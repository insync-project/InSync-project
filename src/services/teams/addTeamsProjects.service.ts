import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Project, User, UserProjectTeam } from "../../entities";
import { AppError } from "../../errors";

export const addTeamsProjectsService = async (req: Request): Promise<any> => {
  const projectsRepo = AppDataSource.getRepository(Project);
  const usersRepo = AppDataSource.getRepository(User);
  const teamsProject = AppDataSource.getRepository(UserProjectTeam);

  const findProject: Project | null = await projectsRepo.findOne({
    where: {
      id: Number(req.params.projectId),
    },
  });

  if (!findProject) {
    throw new AppError("Project not found!", 404);
  }

  const findOneProject: Project | null = await projectsRepo.findOne({
    where: {
      owner: {
        id: Number(req.userTokenInfos.id),
      },
      id: Number(req.params.projectId),
    },
  });

  if (findOneProject) {
    throw new AppError("User owns the project!", 409);
  }

  const findTeamProject: UserProjectTeam | null = await teamsProject.findOne({
    where: {
      user: {
        id: Number(req.userTokenInfos.id),
      },
      project: {
        id: Number(req.params.projectId),
      },
    },
  });

  if (findTeamProject) {
    throw new AppError("User already belongs to this project!", 409);
  }

  const findUser: User | null = await usersRepo.findOne({
    where: {
      id: Number(req.userTokenInfos.id),
    },
  });

  const newRequestTeam: UserProjectTeam = teamsProject.create({
    user: findUser!,
    project: findProject!,
  });

  await teamsProject.save(newRequestTeam);

  return { message: "Request sent successfully" };
};
