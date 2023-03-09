import { z } from "zod";
import {
  projectsCreateReturnSchema,
  projectsCreateReturnSchemaArray,
  projectsCreateSchema,
  projectsSchemas,
} from "../schemas/projects.schemas";

export type iProjectsSchema = z.infer<typeof projectsSchemas>;

export type iProjectsCreateSchema = z.infer<typeof projectsCreateSchema>;

export type iProjectsCreateReturnSchema = z.infer<
  typeof projectsCreateReturnSchema
>;

export type iProjectsCreateReturnSchemaArray = z.infer<
  typeof projectsCreateReturnSchemaArray
>;
