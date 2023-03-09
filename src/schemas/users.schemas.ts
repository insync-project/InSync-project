import { z } from "zod";

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

export const returnFullCreateUserSchema = returnCreateUser.extend({
  socialMedia: returnSocialMedia,
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
