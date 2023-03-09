import { Request, Response } from "express";
import { ICreateTechnology } from "../interfaces/technologies.interfaces";
import { createProjectTechnologiesService } from "../services/technologies/createProjectsTechnologies.service";
import { createTechnologyService } from "../services/technologies/createTechnology.service";
import { createUserTechnologiesService } from "../services/technologies/createUserTechnologies.service";
import { deleteTechnologyService } from "../services/technologies/deleteTechnology.service";
import { listAllTechnologiesService } from "../services/technologies/listAllTechnologies.service";


export const createTechnologyController = async (
	request: Request,
	response: Response
) => {
	const technologyData: ICreateTechnology = request.body;

	const newTechnology = await createTechnologyService(technologyData);

	return response.status(201).json(newTechnology);
};

export const listAllTechnologiesController = async (
	request: Request,
	response: Response
) => {
	const allTechnologies = await listAllTechnologiesService();

	return response.json(allTechnologies);
};

export const deleteTechnologyController = async (
	request: Request,
	response: Response
) => {
	const technologyId = parseInt(request.params.techId);

	await deleteTechnologyService(technologyId);

	return response.status(204).send();
};

export const createUserTechnologiesController = async (
	request: Request,
	response: Response
) => {
	const technologies = request.body.techs;
	const userId = parseInt(request.userTokenInfos.id!)

	const newTechnology = await createUserTechnologiesService(technologies, userId);

	return response.status(201).json(newTechnology);
};

export const createProjectTechnologiesController = async (
	request: Request,
	response: Response
) => {
	const technologies = request.body.techs;
	const projectId = parseInt(request.params.projectId!)

	const newTechnology = await createProjectTechnologiesService(technologies, projectId);

	return response.status(201).json(newTechnology);
};