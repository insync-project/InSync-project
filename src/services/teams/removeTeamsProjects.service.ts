import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { UserProjectTeam } from "../../entities";
import { AppError } from "../../errors";

export const removeUserTeamsProjectsService = async (
  req: Request
): Promise<void> => {
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
      user: true,
    },
  });
  console.log(findProjectTeamRepo);
  if (!findProjectTeamRepo) {
    throw new AppError("User not found in the project!", 404);
  }

  const ownerProject: number = findProjectTeamRepo.project.owner.id;

  console.log(ownerProject !== Number(req.userTokenInfos.id));
  console.log(findProjectTeamRepo.user.id !== Number(req.userTokenInfos.id));
  if (
    ownerProject !== Number(req.userTokenInfos.id) &&
    findProjectTeamRepo.user.id !== Number(req.userTokenInfos.id)
  ) {
    throw new AppError("Insufficient permission!", 403);
  }

  await AppDataSource.createQueryBuilder()
    .delete()
    .from(UserProjectTeam)
    .where("users_projects_team.id = :id", {
      id: Number(findProjectTeamRepo.id),
    })
    .execute();
};
