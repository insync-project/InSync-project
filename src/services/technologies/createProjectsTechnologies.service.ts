import { AppDataSource } from "../../data-source";
import { Project, ProjectTechnology, Technology } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { returnProjectsTechnolgies } from "../../schemas/projects.schemas";

export const createProjectTechnologiesService = async (
  technologies: string[],
  project: Project,
  projectId: number
): Promise<any> => {
  if (technologies.length === 0) {
    throw new AppError("It is necessary to send at lest one technology", 400);
  }

  const projectTechnologyRepository: Repository<ProjectTechnology> =
    AppDataSource.getRepository(ProjectTechnology);
  const projectRepository: Repository<Project> =
    AppDataSource.getRepository(Project);
  const technologyRepository: Repository<Technology> =
    AppDataSource.getRepository(Technology);

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

  const arrProjectTech = findProjectTech.map((tech) => {
    return tech.technology.name;
  });

  const filteredTechs = technologies.filter(
    (elem: string) => !arrProjectTech.includes(elem)
  );

  if (filteredTechs.length === 0) {
    throw new AppError("These technologies have already been added", 400);
  }

  const findProject = await projectRepository.findOne({
    where: {
      id: projectId,
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

  let projectTechsFind: {
    project: Project;
    technology: Technology;
  }[] = [];

  findTech.forEach((tech) => {
    if (filteredTechs.includes(tech.name)) {
      projectTechsFind.push({ project: findProject!, technology: tech });
    }
  });

  await projectTechnologyRepository
    .createQueryBuilder()
    .insert()
    .values(projectTechsFind)
    .returning("*")
    .execute();

  const newFindProject = await projectRepository.findOne({
    where: {
      id: projectId,
    },
    relations: {
      projectTechnologies: {
        technology: true,
      },
    },
  });

  const resultProject = returnProjectsTechnolgies.parse(
    newFindProject?.projectTechnologies
  );

  return resultProject;
};
