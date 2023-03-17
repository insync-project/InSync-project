import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Technology } from "../../entities";
import { AppError } from "../../errors";

export const deleteTechnologyService = async (technologyId: number): Promise<void> => {
	const technologyRepository: Repository<Technology> = AppDataSource.getRepository(Technology);

	const technology = await technologyRepository.findOne({
		where: {
			id: technologyId,
		},
	});

	if (!technology) {
		throw new AppError("Technology not found", 404);
	}

	await technologyRepository.delete(technology!);
};
