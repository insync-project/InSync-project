import { AppDataSource } from "../../data-source";
import { User, UserTechnology } from "../../entities";
import { In, Repository } from "typeorm";

export const removeUserTechnologiesService = async (
	technologies: any,
	userId: number
): Promise<void> => {
	const userTechnologyRepository: Repository<UserTechnology> =
		AppDataSource.getRepository(UserTechnology);
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

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

	await userTechnologyRepository
		.createQueryBuilder()
		.delete()
		.where({ id: In(filteredTechs) })
		.execute();
};
