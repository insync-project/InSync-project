import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities";
import { generateToken } from "../../mocks/session/token.mock";
import { userDeleteMock } from "../../mocks/users/deleteUsers.route.mock";

describe("DELETE /users", () => {
  let connection: DataSource;

  const userRepo = AppDataSource.getRepository(User);

  const baseUrl: string = "/users";
  const destroyInvalidIDUrlNumber: string = baseUrl + "/123456";
  const destroyInvalidIDUrlString: string = baseUrl + "/aaaaaa";

  let userAdmin: User;
  let userNotAdmin: User;
  let userExtra: User;

  let destroyAdminUrl: string;
  let destroyUserUrl: string;
  let destroyUserExtraUrl: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const users: User[] = await userRepo.find();
    await userRepo.remove(users);

    userAdmin = await userRepo.save(userDeleteMock.userAdminTemplate);
    userNotAdmin = await userRepo.save(userDeleteMock.userNotAdminTemplate);
    userExtra = await userRepo.save(userDeleteMock.userExtra);

    destroyAdminUrl = baseUrl + `/${userAdmin.id}`;
    destroyUserUrl = baseUrl + `/${userNotAdmin.id}`;
    destroyUserExtraUrl = baseUrl + `/${userExtra.id}`;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: Admin must be able to delete a user - Admin token ", async () => {
    const response = await supertest(app)
      .delete(destroyUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.admin!,
          userAdmin.email,
          userAdmin.id
        )}`
      );

    const expectResults = { status: 204 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Success: User must be able to delete your user - User token ", async () => {
    const response = await supertest(app)
      .delete(destroyUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.admin!,
          userNotAdmin.email,
          userNotAdmin.id
        )}`
      );

    const expectResults = { status: 204 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({});
  });

  it("Error: User must not be able to delete another user - User token ", async () => {
    const response = await supertest(app)
      .delete(destroyUserExtraUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userNotAdmin.admin!,
          userNotAdmin.email,
          userNotAdmin.id
        )}`
      );

    const expectResults = { status: 403 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({ message: "Insufficient permission" });
  });

  it("Error: Must not be able to destroy - Invalid ID number ", async () => {
    const response = await supertest(app)
      .delete(destroyInvalidIDUrlNumber)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.admin!,
          userAdmin.email,
          userAdmin.id
        )}`
      );

    const expectResults = { status: 404 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({ message: "User not found" });
  });

  it("Error: Must not be able to destroy - Invalid ID string ", async () => {
    const response = await supertest(app)
      .delete(destroyInvalidIDUrlString)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.admin!,
          userAdmin.email,
          userAdmin.id
        )}`
      );

    const expectResults = { status: 404 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({ message: "User not found" });
  });

  it("Error: Must not be able to destroy - User soft deleted ", async () => {
    await userRepo.softRemove(userNotAdmin);

    const response = await supertest(app)
      .delete(destroyUserUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userAdmin.admin!,
          userAdmin.email,
          userAdmin.id
        )}`
      );

    const expectResults = { status: 404 };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({ message: "User not found" });
  });

  it("Error: Must not be able to destroy - Missing bearer", async () => {
    const response = await supertest(app).delete(destroyAdminUrl);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "Missing bearer token" });
  });

  it("Error: Must not be able to destroy - Invalid signature", async () => {
    const response = await supertest(app)
      .delete(destroyAdminUrl)
      .set("Authorization", `Bearer ${generateToken.invalidSignature}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "invalid signature" });
  });

  it("Error: Must not be able to destroy - JWT malformed", async () => {
    const response = await supertest(app)
      .delete(destroyAdminUrl)
      .set("Authorization", `Bearer ${generateToken.jwtMalformed}`);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "jwt malformed" });
  });
});
