import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { iProjectsCreateReturnSchemaArray } from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchemaArray } from "../../schemas/projects.schemas";

export const retrieveAllProjectsService =
  async (): Promise<iProjectsCreateReturnSchemaArray> => {
    const projectsRepo = AppDataSource.getRepository(Project);

    const projectsResult: Project[] = await projectsRepo.find({
      relations: {
        projectTechnologies: {
          technology: true,
        },
        owner: true,
        team: true,
      },
    });

    const projectParse: iProjectsCreateReturnSchemaArray =
      projectsCreateReturnSchemaArray.parse(projectsResult);

    return projectParse;
  };
