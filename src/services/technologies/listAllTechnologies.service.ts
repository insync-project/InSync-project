import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Technology } from "../../entities";
import { IAllReturnTecnologies } from "../../interfaces/technologies.interfaces";
import { allReturnTechnologiesSchema } from "../../schemas/technologies.schemas";


export const listAllTechnologiesService = async (): Promise<IAllReturnTecnologies> => {
	const technologyRepository: Repository<Technology> =
		AppDataSource.getRepository(Technology);

	const findTechnologies = await technologyRepository.find({});

	const allTechnologies = allReturnTechnologiesSchema.parse(findTechnologies);

	return allTechnologies;
};
