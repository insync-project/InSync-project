import { AppDataSource } from "../../data-source";
import { Project } from "../../entities";
import { iProjectsCreateReturnSchemaArray } from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchemaArray } from "../../schemas/projects.schemas";

export const retrieveAllProjectsService =
  async (): Promise<iProjectsCreateReturnSchemaArray> => {
    const projectsRepo = AppDataSource.getRepository(Project);

    const projectsResult = await projectsRepo
      .createQueryBuilder("projects")
      .leftJoinAndSelect("projects.owner", "owner")
      .leftJoinAndSelect("projects.projectTechnologies", "projectTechnologies")
      .leftJoinAndSelect("projectTechnologies.technology", "technology")
      .leftJoinAndSelect("projects.team", "team")
      .leftJoinAndSelect("team.user", "userTeam")
      .getMany();

    const projectParse: iProjectsCreateReturnSchemaArray =
      projectsCreateReturnSchemaArray.parse(projectsResult);

    const filteredProject = projectParse.map((element) => {
      const returnNewteam = element.team.filter((team) => {
        return team.waiting === false;
      });
      return {
        ...element,
        team: returnNewteam,
      };
    });

    return filteredProject;
  };
