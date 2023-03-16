import { AppDataSource } from "../../data-source";
import { Project, ProjectTechnology } from "../../entities";
import { In, Repository } from "typeorm";
import { AppError } from "../../errors";

export const removeProjectTechnologiesService = async (
  technologies: string[],
  project: Project,
  projectId: number
): Promise<void> => {
  if (technologies.length === 0) {
    throw new AppError("It is necessary to send at lest one technology", 400);
  }

  const projectTechnologyRepository: Repository<ProjectTechnology> =
    AppDataSource.getRepository(ProjectTechnology);

  if (project.status === "Finalizado") {
    throw new AppError("Unable to make changes to a finished project!", 400);
  }

  let findProjectTech = await projectTechnologyRepository.find({
    where: {
      project: {
        id: projectId,
      },
    },
    relations: {
      technology: true,
    },
  });

  const techsIdDelete: number[] = [];

  technologies.forEach((tech) => {
    let exists = false;
    findProjectTech.forEach((userTech) => {
      if (userTech.technology.name === tech) {
        exists = true;
        techsIdDelete.push(userTech.id);
      }
    });
    if (exists === false) {
      throw new AppError(`Project does not have the technology: ${tech}`, 400);
    }
  });

  await projectTechnologyRepository
    .createQueryBuilder()
    .delete()
    .where({ id: In(techsIdDelete) })
    .execute();
};
