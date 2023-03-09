import { AppDataSource } from "../../data-source";
import { Technology } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { ICreateTechnology } from "../../interfaces/technologies.interfaces";
import { returnTechnologySchema } from "../../schemas/technologies.schemas";

export const createTechnologyService = async (
	TechnologyData: ICreateTechnology
): Promise<Technology> => {
	const technologyRepository: Repository<Technology> =
		AppDataSource.getRepository(Technology);

	const findTechnology = await technologyRepository.findOne({
		where: {
			name: TechnologyData.name,
		},
	});

	if (findTechnology) {
		throw new AppError("Technology already exists", 409);
	}

	const technology: Technology = technologyRepository.create(TechnologyData);

	await technologyRepository.save(technology);

	const newTechnology = returnTechnologySchema.parse(technology);

	return newTechnology;
};