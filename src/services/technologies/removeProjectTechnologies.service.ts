import { AppDataSource } from "../../data-source";
import { Project, ProjectTechnology } from "../../entities";
import { In, Repository } from "typeorm";
import { AppError } from "../../errors";

export const removeProjectTechnologiesService = async (
	technologies: any,
	project: any,
	projectId: number
): Promise<void> => {
	const projectTechnologyRepository: Repository<ProjectTechnology> =
		AppDataSource.getRepository(ProjectTechnology);

	if (project.status === "Finalizado") {
		throw new AppError("Unable to make changes to a finished project!", 400);
	}

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

	const projectTechs = findProjectTech.map((tech) => {
		return tech.id;
	});

	const findBodyTechs = await Promise.all(
		technologies.map(async (techs: any) => {
			let findProjectTechByName = await projectTechnologyRepository.findOne({
				where: {
					technology: {
						name: techs,
					},
					project: {
						id: projectId,
					},
				},
			});

			if (findProjectTechByName) {
				return findProjectTechByName.id;
			}
		})
	);

	const filteredTechs = findBodyTechs.filter((elem: any) =>
		projectTechs.includes(elem)
	);

	if (filteredTechs.length == 0) {
		throw new AppError("Essas tecnologias já foram removidas", 400);
	}

	await projectTechnologyRepository
		.createQueryBuilder()
		.delete()
		.where({ id: In(filteredTechs) })
		.execute();
};
