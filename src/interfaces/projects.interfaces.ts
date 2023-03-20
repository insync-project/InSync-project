import { z } from "zod";
import {
  createUserSchemaOptional,
  projectReturnNewTeam,
  projectsCreateReturnSchema,
  projectsCreateReturnSchemaArray,
  projectsCreateSchema,
  projectsSchemas,
  projectsUpdateBodySchema,
  projectsUpdateSchema,
  returnCreateTeamsProjects,
} from "../schemas/projects.schemas";

export type iProjectsSchema = z.infer<typeof projectsSchemas>;

export type iProjectsCreateSchema = z.infer<typeof projectsCreateSchema>;

export type iProjectsCreateReturnSchema = z.infer<
  typeof projectsCreateReturnSchema
>;

export type iProjectsCreateReturnSchemaArray = z.infer<
  typeof projectsCreateReturnSchemaArray
>;

export type iProjectsUpdateSchema = z.infer<typeof projectsUpdateSchema>;

export type iProjectsUpdateBodySchema = z.infer<
  typeof projectsUpdateBodySchema
>;

export type iReturnTeamProjectsWaiting = z.infer<
  typeof returnCreateTeamsProjects
>;

export type iProjectReturnNewTeam = z.infer<typeof projectReturnNewTeam>;

export type iCreatUserOptional = z.infer<typeof createUserSchemaOptional>;
