import { AppDataSource } from "../../data-source";
import { Project, ProjectTechnology } from "../../entities";
import { In, Repository } from "typeorm";

export const removeProjectTechnologiesService = async (
	technologies: any,
	projectId: number
): Promise<void> => {
	const projectTechnologyRepository: Repository<ProjectTechnology> =
		AppDataSource.getRepository(ProjectTechnology);
	const projectRepository: Repository<Project> =
		AppDataSource.getRepository(Project);

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

	await projectTechnologyRepository
		.createQueryBuilder()
		.delete()
		.where({ id: In(filteredTechs) })
		.execute();
};
