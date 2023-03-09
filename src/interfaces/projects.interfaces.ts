import { z } from "zod";
import {
  projectsCreateReturnSchema,
  projectsCreateSchema,
  projectsSchemas,
} from "../schemas/projects.schemas";

export type iProjectsSchema = z.infer<typeof projectsSchemas>;

export type iProjectsCreateSchema = z.infer<typeof projectsCreateSchema>;

export type iProjectsCreateReturnSchema = z.infer<
  typeof projectsCreateReturnSchema
>;
