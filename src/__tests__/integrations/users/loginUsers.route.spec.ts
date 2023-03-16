import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities";
import { userLoginMock } from "../../mocks/users/loginUsers.route.spec";

describe("POST /users/login", () => {
  let connection: DataSource;

  const baseUrl: string = "/users/login";
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

  it("Success: Must be able to login with email", async () => {
    const user: User = userRepo.create(userLoginMock.userActive);
    await userRepo.save(user);

    const response = await supertest(app).post(baseUrl).send({
      user: userLoginMock.userActive.email,
      password: userLoginMock.userActive.password,
    });

    const expectResults = {
      status: 200,
      bodyEqual: { token: expect.any(String) },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Success: Must be able to login with nickname", async () => {
    const user: User = userRepo.create(userLoginMock.userActive);
    await userRepo.save(user);

    const response = await supertest(app).post(baseUrl).send({
      user: userLoginMock.userActive.nickname,
      password: userLoginMock.userActive.password,
    });

    const expectResults = {
      status: 200,
      bodyEqual: { token: expect.any(String) },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 1 - Wrong password", async () => {
    const user: User = userRepo.create(userLoginMock.userActive);
    await userRepo.save(user);

    const response = await supertest(app).post(baseUrl).send({
      user: userLoginMock.userInvalidCredential1.user,
      password: userLoginMock.userInvalidCredential1.password,
    });

    const expectResults = {
      status: 401,
      bodyEqual: { message: "Invalid credentials" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 2 - Wrong user", async () => {
    const user: User = userRepo.create(userLoginMock.userActive);
    await userRepo.save(user);

    const response = await supertest(app).post(baseUrl).send({
      user: userLoginMock.userInvalidCredential1.user,
      password: userLoginMock.userInvalidCredential1.password,
    });

    const expectResults = {
      status: 401,
      bodyEqual: { message: "Invalid credentials" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });

  it("Error: Must not be able to login - Invalid credential 3 - User inactive", async () => {
    const user: User = userRepo.create(userLoginMock.userToInactive);
    await userRepo.save(user);
    await userRepo.softRemove(user);

    const response = await supertest(app).post(baseUrl).send({
      user: userLoginMock.userToInactive.email,
      password: userLoginMock.userToInactive.password,
    });

    const expectResults = {
      status: 401,
      bodyEqual: { message: "Invalid credentials" },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyEqual);
  });
});
