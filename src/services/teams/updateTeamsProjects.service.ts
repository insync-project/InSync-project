import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { UserProjectTeam } from "../../entities";
import { AppError } from "../../errors";

export const allowUserTeamsProjectsService = async (
  req: Request
): Promise<{ message: string }> => {
  const projectTeamRepo = AppDataSource.getRepository(UserProjectTeam);

  const findProjectTeamRepo = await projectTeamRepo.findOne({
    where: {
      user: {
        id: Number(req.params.userId),
      },
      project: {
        id: Number(req.params.projectId),
      },
    },
    relations: {
      project: {
        team: true,
        owner: true,
      },
    },
  });

  if (!findProjectTeamRepo) {
    throw new AppError("User not found in the waiting list!", 404);
  } else if (findProjectTeamRepo.waiting === false) {
    throw new AppError("You already participate in this project!", 409);
  }

  const ownerProject: number = findProjectTeamRepo.project.owner.id;

  if (ownerProject !== Number(req.userTokenInfos.id)) {
    throw new AppError("Insufficient permission!", 403);
  }

  let teamCount = 0;

  findProjectTeamRepo.project.team.forEach((element) => {
    if (!element.waiting) {
      teamCount++;
    }
  });

  const teamMax = findProjectTeamRepo.project.maxUsers;

  if (teamCount >= teamMax - 1) {
    throw new AppError("This project has exceeded the maximum members", 409);
  }

  await AppDataSource.createQueryBuilder()
    .update(UserProjectTeam)
    .set({ waiting: false })
    .where("users_projects_team.id = :id", {
      id: Number(findProjectTeamRepo.id),
    })
    .execute();

  return { message: "User added successfully!" };
};
