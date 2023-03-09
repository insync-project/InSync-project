import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Technology } from "../../entities";

export const deleteTechnologyService = async (technologyId: number): Promise<void> => {
	const technologyRepository: Repository<Technology> = AppDataSource.getRepository(Technology);

	const technology = await technologyRepository.findOne({
		where: {
			id: technologyId,
		},
	});

	await technologyRepository.delete(technology!);
};
