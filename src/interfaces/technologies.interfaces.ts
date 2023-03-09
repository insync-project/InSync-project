import {z} from "zod"
import { allReturnTechnologiesSchema, createTechnologySchema, returnTechnologySchema } from "../schemas/technologies.schemas"

export type IReturnTechnology = z.infer<typeof returnTechnologySchema>
export type ICreateTechnology = z.infer<typeof createTechnologySchema>
export type IAllReturnTecnologies = z.infer<typeof allReturnTechnologiesSchema>