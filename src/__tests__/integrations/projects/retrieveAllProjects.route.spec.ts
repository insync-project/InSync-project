import supertest from "supertest";
import { DataSource, DeepPartial } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Project, User } from "../../../entities";
import { manyProjects } from "../../mocks/projects/retrieveAllProjects.route.mock";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";

describe("GET /projects", () => {
  let connection: DataSource;

  const baseUrl: string = "/projects";
  const userRepo = AppDataSource.getRepository(User);
  let retrieveAllProjects: Array<DeepPartial<Project>>;
  let newUser: User;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;
        retrieveAllProjects = await manyProjects();
      })
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    newUser = await userRepo.save(userCreateMock.userComplete);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: Must be able list all projects", async () => {
    const response = await supertest(app).get(baseUrl).send();
    let repoUser;

    retrieveAllProjects.map((element) => {
      delete element.owner?.admin;
      delete element.owner?.password;
      delete element.owner?.deletedAt;

      repoUser = element.owner;
    });

    const expectResults = {
      status: 200,
      expectBody: retrieveAllProjects,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(expectResults.expectBody);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          cover: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null,
          owner: repoUser,
          projectTechnologies: expect.any(Array),
          team: expect.any(Array),
        }),
      ])
    );
    expect(response.body[0].owner).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        nickname: expect.any(String),
        description: null,
        avatar: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });
});
