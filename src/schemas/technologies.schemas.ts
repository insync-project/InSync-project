import { z } from "zod";

export const createTechnologySchema = z.object({
  name: z.string().max(30),
});

export const returnTechnologySchema = createTechnologySchema.extend({
  id: z.number(),
});

export const allReturnTechnologiesSchema = returnTechnologySchema.array();

export const addTechSchema = z.object({
  techs: z.string().array(),
});

export const returnUserTechnologySchema = z.object({
  id: z.number(),
});
