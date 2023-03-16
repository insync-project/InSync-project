import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import "dotenv/config";
import { Request } from "express";
import { returnUserProfile } from "../../schemas/users.schemas";
import { iReturnUserByNickname } from "../../interfaces/users.interfaces";

export const retrieveProfileUsersService = async (
  req: Request
): Promise<iReturnUserByNickname> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const userFind = await usersRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.socialMedia", "socialMedia")
    .leftJoinAndSelect("user.userTechnologies", "userTechnologies")
    .leftJoinAndSelect("userTechnologies.technology", "userTechnology")
    .leftJoinAndSelect("user.project", "project")
    .leftJoinAndSelect("project.team", "team")
    .leftJoinAndSelect("team.user", "userTeam")
    .leftJoinAndSelect("project.projectTechnologies", "projectTechnologies")
    .leftJoinAndSelect("projectTechnologies.technology", "technology")
    .leftJoinAndSelect("user.userProjectTeam", "userProjectTeam")
    .leftJoinAndSelect("userProjectTeam.project", "userProjectTeamInfosProject")
    .leftJoinAndSelect(
      "userProjectTeamInfosProject.owner",
      "userProjectTeamInfosProjectOwner"
    )
    .where("user.id = :userId", {
      userId: req.userTokenInfos.id,
    })
    .getOne();

  const returnNewProfileUser = returnUserProfile.parse(userFind);

  return returnNewProfileUser;
};
