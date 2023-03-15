import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import "dotenv/config";
import { Request } from "express";
import { AppError } from "../../errors";

export const retrieveProfileUsersByNicknameService = async (
  req: Request
): Promise<any> => {
  const nicknameParams = req.params.nickname;

  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const userFind = await usersRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.socialMedia", "socialMedia")
    .leftJoinAndSelect("user.userTechnologies", "userTechnologies")
    .leftJoinAndSelect("userTechnologies.technology", "userTechnology")
    .leftJoinAndSelect("user.project", "project")
    .leftJoinAndSelect("project.owner", "owner")
    .leftJoinAndSelect("project.projectTechnologies", "projectTechnologies")
    .leftJoinAndSelect("projectTechnologies.technology", "technology")
    .leftJoinAndSelect("user.userProjectTeam", "userProjectTeam")
    .leftJoinAndSelect("userProjectTeam.project", "userProjectTeamInfosProject")
    .leftJoinAndSelect(
      "userProjectTeamInfosProject.owner",
      "userProjectTeamInfosProjectOwner"
    )
    .leftJoinAndSelect(
      "userProjectTeamInfosProject.projectTechnologies",
      "userProjectTeamInfosProjectProjectTechnologies"
    )
    .leftJoinAndSelect(
      "userProjectTeamInfosProject.team",
      "userProjectTeamInfosProjectTeam"
    )
    .where("user.nickname = :nickname", {
      nickname: nicknameParams,
    })
    .getOne();

  if (!userFind) {
    throw new AppError("Profile not found", 404);
  }
  return userFind;
};
