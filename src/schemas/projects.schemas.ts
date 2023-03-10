import { z } from "zod";
import {
  devTypeProjectRole,
  statusProjectRole,
} from "../entities/projects.entities";

export const projectsSchemas = z.object({
  id: z.number().positive().int(),
  name: z.string().trim().max(50),
  description: z.string().trim().max(500),
  devType: z.union([
    z.literal(devTypeProjectRole.FRONT),
    z.literal(devTypeProjectRole.BACK),
    z.literal(devTypeProjectRole.FULL),
  ]),
  status: z.union([
    z.literal(statusProjectRole.OPEN),
    z.literal(statusProjectRole.CLOSED),
    z.literal(statusProjectRole.INPROCESS),
  ]),
  cover: z.string().max(150).nullable().optional(),
  maxUsers: z.number().int().positive().min(1).max(10),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const returnCreateUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  nickname: z.string(),
  description: z.string().nullable(),
  avatar: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const returnCreateTeamsProjects = z
  .object({
    id: z.number().positive().int(),
    waiting: z.boolean().default(true),
    addedAt: z.string(),
    updatedAt: z.string(),
    project: projectsSchemas.optional(),
    user: returnCreateUser,
  })
  .array();

export const returnTechnologySchema = z.object({
  name: z.string().max(30),
  id: z.number(),
});

export const returnProjectsTechnolgies = z
  .object({
    id: z.number(),
    addedAt: z.string(),
    technology: returnTechnologySchema,
  })
  .array();

export const projectsCreateSchema = projectsSchemas.omit({
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
  status: true,
  id: true,
});

export const projectsCreateReturnSchema = projectsSchemas.extend({
  owner: returnCreateUser,
  projectTechnologies: returnProjectsTechnolgies,
  team: returnCreateTeamsProjects,
});

export const projectReturnNewTeam = projectsCreateReturnSchema
  .extend({
    teamWaitingTrue: returnCreateTeamsProjects,
    teamWaitingFalse: returnCreateTeamsProjects,
  })
  .omit({
    team: true,
  });

export const projectsCreateReturnSchemaArray =
  projectsCreateReturnSchema.array();

export const projectsUpdateSchema = projectsCreateSchema
  .extend({
    status: z.union([
      z.literal(statusProjectRole.OPEN),
      z.literal(statusProjectRole.CLOSED),
      z.literal(statusProjectRole.INPROCESS),
    ]),
  })
  .partial();

export const projectsUpdateBodySchema = projectsUpdateSchema.required();
