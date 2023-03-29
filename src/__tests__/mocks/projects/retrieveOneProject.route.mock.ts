import { DeepPartial } from "typeorm";
import { Project, User } from "../../../entities";
import { AppDataSource } from "../../../data-source";
import { userCreateMock } from "../users/createUser.route.mock";

export const oneProject = async (): Promise<DeepPartial<Project>> => {
  const projectsRepo = AppDataSource.getRepository(Project);
  const usersRepo = AppDataSource.getRepository(User);

  const newUser = await usersRepo.save(userCreateMock.userComplete);

  const {
    password,
    deletedAt,
    userProjectTeam,
    userTechnologies,
    socialMedia,
    project,
    admin,
    ...owner
  } = newUser;

  const newOneProject = {
    name: "Novo projeto",
    description: "Uma descrição qualquer!!!!!",
    devType: "Front-end",
    status: "Aberto",
    cover: null,
    maxUsers: 5,
    owner: owner,
    projectTechnologies: expect.any(Array),
    team: expect.any(Array),
  };

  await projectsRepo
    .createQueryBuilder("projects")
    .insert()
    .values(newOneProject)
    .execute();

  return newOneProject;
};
