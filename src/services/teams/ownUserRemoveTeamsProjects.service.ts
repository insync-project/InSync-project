import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { UserProjectTeam } from "../../entities";
import { AppError } from "../../errors";

export const ownUserRemoveTeamsProjectsService = async (
  req: Request
): Promise<void> => {
  const projectTeamRepo = AppDataSource.getRepository(UserProjectTeam);

  const findProjectTeamRepo = await projectTeamRepo.findOne({
    where: {
      user: {
        id: Number(req.userTokenInfos.id),
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
    throw new AppError("User not found in this project!", 404);
  }

  await AppDataSource.createQueryBuilder()
    .delete()
    .from(UserProjectTeam)
    .where("users_projects_team.id = :id", {
      id: Number(findProjectTeamRepo.id),
    })
    .execute();
};
