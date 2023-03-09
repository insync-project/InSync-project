import { z } from "zod";
import {
  devTypeProjectRole,
  statusProjectRole,
} from "../entities/projects.entities";
import { returnCreateUser } from "./users.schemas";
import { allReturnTechnologiesSchema } from "./technologies.schemas";

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
