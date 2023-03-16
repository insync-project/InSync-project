import { AppDataSource } from "../../data-source";
import { Technology, User, UserTechnology } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { returnProjectsTechnolgies } from "../../schemas/projects.schemas";

export const createUserTechnologiesService = async (
  technologies: string[],
  userId: number
): Promise<any> => {
  if (technologies.length === 0) {
    throw new AppError("It is necessary to send at lest one technology", 400);
  }

  const userTechnologyRepository: Repository<UserTechnology> =
    AppDataSource.getRepository(UserTechnology);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const technologyRepository: Repository<Technology> =
    AppDataSource.getRepository(Technology);

  let findUserTech = await userTechnologyRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      technology: true,
    },
  });

  const arrUserTech = findUserTech.map((tech) => {
    return tech.technology.name;
  });

  const filteredTechs = technologies.filter(
    (elem: string) => !arrUserTech.includes(elem)
  );

  if (filteredTechs.length === 0) {
    throw new AppError("These technologies have already been added", 400);
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  let findTech = await technologyRepository.find();

  filteredTechs.forEach((element) => {
    let exists = false;
    findTech.forEach((tech) => {
      if (tech.name === element) {
        exists = true;
      }
    });
    if (exists === false) {
      throw new AppError(`${element} is not a valid technology`, 400);
    }
  });

  let userTechsFind: {
    user: User;
    technology: Technology;
  }[] = [];

  findTech.forEach((tech) => {
    if (filteredTechs.includes(tech.name)) {
      userTechsFind.push({ user: findUser!, technology: tech });
    }
  });

  await userTechnologyRepository
    .createQueryBuilder()
    .insert()
    .values(userTechsFind)
    .returning("*")
    .execute();

  const newFindUser = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      userTechnologies: {
        technology: true,
      },
    },
  });

  const resultProject = returnProjectsTechnolgies.parse(
    newFindUser?.userTechnologies
  );

  return resultProject;
};
