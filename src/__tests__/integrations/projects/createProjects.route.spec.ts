import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { Project, User } from "../../../entities";
import { createProjectsMock } from "../../mocks/projects/createProjects.route.mock";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";
import { generateToken } from "../../mocks/session/token.mock";

describe("POST /projects", () => {
  let connection: DataSource;

  const baseUrl: string = "/projects";
  const projectRepo = AppDataSource.getRepository(Project);
  const userRepo = AppDataSource.getRepository(User);
  let newUser: User;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => (connection = res))
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const projects: Array<Project> = await projectRepo.find();
    await projectRepo.remove(projects);
    newUser = await userRepo.save(userCreateMock.userComplete);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: Must be able to create a project - Full body", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          newUser.admin!,
          newUser.email,
          newUser.id
        )}`
      )
      .send(createProjectsMock.createFullBody);

    const {
      password,
      deletedAt,
      userProjectTeam,
      userTechnologies,
      socialMedia,
      project,
      admin,
      ...owner
    } = newUser;

    const expectResults = {
      status: 201,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(createProjectsMock.createFullBody)
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        cover: null,
        status: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null,
        owner,
        projectTechnologies: expect.any(Array),
        team: expect.any(Array),
      })
    );
    expect(response.body.owner).toEqual(
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

  it("Error: Must not be able to create a project - Unfinished project", async () => {
    const newProject = {
      ...createProjectsMock.createUniqueBody,
      owner: { ...newUser },
    };
    const retrieveProject = await projectRepo.save(newProject);

    const response = await supertest(app)
      .post(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          newUser.admin!,
          newUser.email,
          newUser.id
        )}`
      )
      .send(createProjectsMock.createUniqueBody);

    const expectResults = {
      status: 409,
      expectBody: `finalize your ${retrieveProject.name} project`,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual({ message: `${expectResults.expectBody}` });
  });

  it("Error: Must not be able to create a project - Invalid body", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          newUser.admin!,
          newUser.email,
          newUser.id
        )}`
      )
      .send(createProjectsMock.createInvalidBody);

    const expectResults = {
      status: 400,
      expectBody: {
        message: {
          name: ["Expected string, received array"],
          description: ["Expected string, received array"],
          devType: [
            "Invalid enum value. Expected 'Front-end' | 'Back-end' | 'Full-stack', received 'outro valor'",
          ],
          maxUsers: ["Number must be less than or equal to 10"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.expectBody);
  });

  it("Error: Must not be able to create a project - Invalid body 2", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          newUser.admin!,
          newUser.email,
          newUser.id
        )}`
      )
      .send(createProjectsMock.createInvalidBody2);

    const expectResults = {
      status: 400,
      expectBody: {
        message: {
          description: ["Required"],
          devType: ["Required"],
          maxUsers: ["Required"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.expectBody);
  });

  it("Error: Must be not able to create a project - Missing bearer", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(createProjectsMock.createFullBody);

    const expectResults = {
      status: 401,
      expectBody: "Missing bearer token",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: `${expectResults.expectBody}`,
    });
  });

  it("Error: Must be not able to create a project - Invalid signature", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${generateToken.invalidSignature}`)
      .send(createProjectsMock.createFullBody);

    const expectResults = {
      status: 401,
      expectBody: "invalid signature",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: `${expectResults.expectBody}`,
    });
  });

  it("Error: Must be not able to create a project - JWT malformed", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${generateToken.jwtMalformed}`)
      .send(createProjectsMock.createFullBody);

    const expectResults = {
      status: 401,
      expectBody: "jwt malformed",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: `${expectResults.expectBody}`,
    });
  });
});
