import supertest from "supertest";
import { DataSource, DeepPartial } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Project, User } from "../../../entities";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";
import { generateToken } from "../../mocks/session/token.mock";
import { oneProject } from "../../mocks/projects/retrieveOneProject.route.mock";

describe("GET, /projects", () => {
  let connection: DataSource;

  const baseUrl: string = "/projects/1";
  const userRepo = AppDataSource.getRepository(User);
  let retrieveOneProject: DeepPartial<Project>;
  let newUser: User;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;
        retrieveOneProject = await oneProject();
      })
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    newUser = await userRepo.save(userCreateMock.userComplete);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: Must be able list one project", async () => {
    const response = await supertest(app)
      .get(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          newUser.admin!,
          newUser.email,
          newUser.id
        )}`
      )
      .send();

    const { team, ...project } = retrieveOneProject;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...project,
      teamWaitingTrue: expect.any(Array),
      teamWaitingFalse: expect.any(Array),
    });
  });
});
