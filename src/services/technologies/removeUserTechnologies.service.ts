import { AppDataSource } from "../../data-source";
import { UserTechnology } from "../../entities";
import { In, Repository } from "typeorm";
import { AppError } from "../../errors";

export const removeUserTechnologiesService = async (
  technologies: string[],
  userId: number
): Promise<void> => {
  if (technologies.length === 0) {
    throw new AppError("It is necessary to send at lest one technology", 400);
  }

  const userTechnologyRepository: Repository<UserTechnology> =
    AppDataSource.getRepository(UserTechnology);

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

  const techsIdDelete: number[] = [];

  technologies.forEach((tech) => {
    let exists = false;
    findUserTech.forEach((userTech) => {
      if (userTech.technology.name === tech) {
        exists = true;
        techsIdDelete.push(userTech.id);
      }
    });
    if (exists === false) {
      throw new AppError(`User does not have the technology: ${tech}`, 400);
    }
  });

  await userTechnologyRepository
    .createQueryBuilder()
    .delete()
    .where({ id: In(techsIdDelete) })
    .execute();
};
