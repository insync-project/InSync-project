import { AppDataSource } from "../../data-source";
import { Technology, User, UserTechnology } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const createUserTechnologiesService = async (
	technologies: any,
	userId: number
): Promise<any> => {
	const userTechnologyRepository: Repository<UserTechnology> =
		AppDataSource.getRepository(UserTechnology);
	const userRepository: Repository<User> = AppDataSource.getRepository(User);
	const technologyRepository: Repository<Technology> =
		AppDataSource.getRepository(Technology);

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

	let arrUserTech: any = [];

	const userTechs = findUserTech.map((tech) => {
		arrUserTech.push(tech.technology.name);
	});

	const filteredTechs = technologies.filter((elem: any) => !arrUserTech.includes(elem));

	if (filteredTechs.length == 0) {
		throw new AppError("Essas tecnologias já foram adicionadas", 400);
	}

	const findUser = await userRepository.findOne({
		where: {
			id: userId,
		},
	});

	let findTech = await technologyRepository.find();

	let arrayFind: any = [];

	findTech.forEach((tech: any) => {
		if (filteredTechs.includes(tech.name)) {
			arrayFind.push({ user: findUser, technology: tech });
		}
	});

	await userTechnologyRepository
		.createQueryBuilder()
		.insert()
		.values(arrayFind)
		.returning("*")
		.execute();

	const newFindUser = await userRepository.findOne({
		where: {
			id: userId,
		},
		relations: {
			userTechnologies: {
				technology: true,
			},
		},
	});

	return newFindUser;
};
