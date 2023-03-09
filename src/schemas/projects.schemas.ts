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
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const returnCreateUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  nickname: z.string(),
  admin: z.boolean(),
  description: z.string().nullable(),
  avatar: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const projectsCreateSchema = projectsSchemas.omit({
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
  status: true,
  id: true,
});

export const projectsCreateReturnSchema = projectsSchemas.extend({
  owner: returnCreateUser,
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
