import { AppDataSource } from "../../data-source";
import { UserTechnology } from "../../entities";
import { In, Repository } from "typeorm";
import { AppError } from "../../errors";

export const removeUserTechnologiesService = async (
	technologies: any,
	userId: number
): Promise<void> => {
	const userTechnologyRepository: Repository<UserTechnology> =
		AppDataSource.getRepository(UserTechnology);

	let findUserTech = await userTechnologyRepository.find({
		where: {
			user: {
				id: userId,
			},
		},
		relations: {
			technology: true,
		},
	});

	const userTechs = findUserTech.map((tech) => {
		return tech.id;
	});

	const findBodyTechs = await Promise.all(
		technologies.map(async (techs: any) => {
			let findUserTechByName = await userTechnologyRepository.findOne({
				where: {
					technology: {
						name: techs,
					},
					user: {
						id: userId,
					},
				},
			});

			if (findUserTechByName) {
				return findUserTechByName.id;
			}
		})
	);

	const filteredTechs = findBodyTechs.filter((elem: any) =>
		userTechs.includes(elem)
	);

	if (filteredTechs.length == 0) {
		throw new AppError("Essas tecnologias já foram removidas", 400);
	}

	await userTechnologyRepository
		.createQueryBuilder()
		.delete()
		.where({ id: In(filteredTechs) })
		.execute();
};
