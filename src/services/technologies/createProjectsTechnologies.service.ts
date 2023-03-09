import { AppDataSource } from "../../data-source";
import { Project, ProjectTechnology, Technology, User, UserTechnology } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const createProjectTechnologiesService = async (
	technologies: any,
	projectId: number
): Promise<any> => {
	const projectTechnologyRepository: Repository<ProjectTechnology> =
		AppDataSource.getRepository(ProjectTechnology);
	const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
	const technologyRepository: Repository<Technology> =
		AppDataSource.getRepository(Technology);

	let findProjectTech = await projectTechnologyRepository.find({
		where: {
			project: {
				id: projectId,
			},
		},
		relations: {
			technology: true,
		},
	});

	let arrProjectTech: any = [];

	const ProjectTechs = findProjectTech.map((tech) => {
		arrProjectTech.push(tech.technology.name);
	});

	const filteredTechs = technologies.filter((elem: any) => !arrProjectTech.includes(elem));

	if (filteredTechs.length == 0) {
		throw new AppError("Essas tecnologias já foram adicionadas a esse projeto", 400);
	}

	const findProject = await projectRepository.findOne({
		where: {
			id: projectId,
		},
	});

	let findTech = await technologyRepository.find();

	let arrayFind: any = [];

	findTech.forEach((tech: any) => {
		if (filteredTechs.includes(tech.name)) {
			arrayFind.push({ project: findProject, technology: tech });
		}
	});

	await projectTechnologyRepository
		.createQueryBuilder()
		.insert()
		.values(arrayFind)
		.returning("*")
		.execute();

	const newFindProject = await projectRepository.findOne({
		where: {
			id: projectId,
		},
		relations: {
			projectTechnologies: {
				technology: true,
			},
		},
	});

	return newFindProject;
};
