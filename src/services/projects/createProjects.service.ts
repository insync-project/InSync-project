import { AppDataSource } from "../../data-source";
import { Project, User } from "../../entities";
import {
  iProjectsCreateReturnSchema,
  iProjectsCreateSchema,
} from "../../interfaces/projects.interfaces";
import { projectsCreateReturnSchema } from "../../schemas/projects.schemas";

export const createProjectsService = async (
  payload: iProjectsCreateSchema,
  userId: string | undefined
): Promise<iProjectsCreateReturnSchema> => {
  const projectRepo = AppDataSource.getRepository(Project);
  const userRepo = AppDataSource.getRepository(User);

  const userProjects: User | null = await userRepo.findOne({
    where: {
      id: Number(userId),
    },
  });

  const project: Project = projectRepo.create({
    ...payload,
    owner: { ...userProjects },
  });

  await projectRepo.save(project);

  const returnUser: iProjectsCreateReturnSchema =
    projectsCreateReturnSchema.parse(project);

  return returnUser;
};
