import { DeepPartial } from "typeorm";
import { Project, User } from "../../../entities";
import { AppDataSource } from "../../../data-source";

export const manyProjects = async (): Promise<Array<DeepPartial<Project>>> => {
  const projectsRepo = AppDataSource.getRepository(Project);
  const usersRepo = AppDataSource.getRepository(User);
  const totalProject: number = 5;

  const manyUsers = Array.from(Array(totalProject)).map((_val, index) => {
    const name: string = `user${index}`;

    return {
      name,
      email: `${name}@mail.com`,
      password: "123456",
      nickname: `${name}nickname${index}`,
      admin: false,
    };
  });

  const manyProjectsArray = [];

  for await (const user of manyUsers) {
    const userCreate = await usersRepo.save(user);
    manyProjectsArray.push({
      name: "Novo projeto",
      description: "Uma descrição qualquer!!!",
      devType: "Front-end",
      status: "Aberto",
      cover: null,
      maxUsers: 5,
      owner: userCreate,
      projectTechnologies: expect.any(Array),
      team: expect.any(Array),
    });
  }

  await projectsRepo
    .createQueryBuilder("projects")
    .insert()
    .values(manyProjectsArray)
    .execute();

  return manyProjectsArray;
};
