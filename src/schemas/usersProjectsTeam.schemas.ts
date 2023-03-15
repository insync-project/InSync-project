import { z } from "zod";

export const usersProjectsTeamSchema = z.object({
  id: z.number().positive().int(),
  waiting: z.boolean().default(false),
  AddedAt: z.string(),
});
