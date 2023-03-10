import { z } from "zod";
import { projectsSchemas } from "./projects.schemas";

export const createUserSchema = z.object({
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  nickname: z.string().max(30),
  admin: z.boolean().optional(),
});

const returnSocialMedia = z.object({
  id: z.number(),
  linkedln: z.string().nullable(),
  github: z.string().nullable(),
  youtube: z.string().nullable(),
  instagram: z.string().nullable(),
  discord: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const returnCreateUser = z.object({
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

export const returnFullCreateUserSchema = returnCreateUser
  .extend({
    socialMedia: returnSocialMedia.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }),
    project: projectsSchemas.omit({ deletedAt: true }).array(),
  })
  .omit({ admin: true, createdAt: true, updatedAt: true, deletedAt: true });

export const userLoginSchema = z.object({
  user: z.string(),
  password: z.string(),
});

export const returnLoginSchema = z.object({
  token: z.string(),
  user: returnFullCreateUserSchema,
});

const updateSocialMediaSchema = z.object({
  linkedln: z.string().max(50).optional(),
  github: z.string().max(50).optional(),
  youtube: z.string().max(120).optional(),
  instagram: z.string().max(50).optional(),
  discord: z.string().max(50).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().max(50).optional(),
  password: z.string().max(120).optional(),
  description: z.string().max(500).optional(),
  avatar: z.string().max(150).optional(),
  socialMedia: updateSocialMediaSchema.optional(),
});

export const updateUserNoSocialMediaSchema = updateUserSchema
  .omit({
    socialMedia: true,
  })
  .required();
