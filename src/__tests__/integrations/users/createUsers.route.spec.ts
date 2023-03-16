import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities";
import { userCreateMock } from "../../mocks/users/createUser.route.mock";

describe("POST /users", () => {
  let connection: DataSource;

  const baseUrl: string = "/users";
  const userRepo = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const users: Array<User> = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: Must be able to create a user - Full body", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userComplete);

    const expectResults = {
      status: 201,
      message: "User created successfully!",
      token: expect.any(String),
    };
    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: expectResults.message,
      token: expectResults.token,
    });
  });

  it("Success: Must be able to create a user - Without 'admin'", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userWithoutAdmin);

    const expectResults = {
      status: 201,
      message: "User created successfully!",
      token: expect.any(String),
    };
    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: expectResults.message,
      token: expectResults.token,
    });
  });

  it("Error: Must not be able to create a user - Email already exists", async () => {
    await userRepo.save(userCreateMock.userUniqueEmail);

    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userUniqueEmail);

    const expectResults = {
      status: 409,
      bodyMessage: { message: "Invalid Email" },
    };

    expect(response.status).toBe(expectResults.status);

    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Nickname already exists", async () => {
    await userRepo.save(userCreateMock.userUniqueEmail);

    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userUniqueNickname);

    const expectResults = {
      status: 409,
      bodyMessage: { message: "Invalid nickname" },
    };

    expect(response.status).toBe(expectResults.status);

    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body types", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userInvalidBodyType);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          name: ["Expected string, received number"],
          email: ["Expected string, received array"],
          password: ["Expected string, received number"],
          nickname: ["Expected string, received object"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body required keys", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userInvalidKeys);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          name: ["Required"],
          nickname: ["Required"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to create a user - Invalid body ", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(userCreateMock.userInvalidBody);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          name: ["String must contain at most 50 character(s)"],
          email: [
            "Invalid email",
            "String must contain at most 50 character(s)",
          ],
          nickname: ["String must contain at most 30 character(s)"],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });
});
