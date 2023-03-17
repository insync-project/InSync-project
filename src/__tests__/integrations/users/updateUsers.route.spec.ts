import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { SocialMedia, User } from "../../../entities";
import { generateToken } from "../../mocks/session/token.mock";
import { userUpdateMock } from "../../mocks/users/updateUsers.route.mock";

describe("DELETE /users", () => {
  let connection: DataSource;

  const userRepo = AppDataSource.getRepository(User);
  const socialMediaRepo = AppDataSource.getRepository(SocialMedia);

  const baseUrl: string = "/users";
  const updateInvalidIDUrlNumber: string = baseUrl + "/123456";
  const updateInvalidIDUrlString: string = baseUrl + "/aaaaaa";

  let userComplete: User;
  let socialMediaUserComplete: SocialMedia;
  let userExtra: User;
  let socialMediaUserExtra: SocialMedia;

  let updateUserCompleteUrl: string;
  let updateUserExtraUrl: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const users: User[] = await userRepo.find();
    await userRepo.remove(users);

    socialMediaUserComplete = await socialMediaRepo.save({});
    userComplete = await userRepo.save({
      ...userUpdateMock.userComplete,
      socialMedia: socialMediaUserComplete,
    });

    updateUserCompleteUrl = baseUrl + `/${userComplete.id}`;

    socialMediaUserExtra = await socialMediaRepo.save({});
    userExtra = await userRepo.save({
      ...userUpdateMock.userExtra,
      socialMedia: socialMediaUserExtra,
    });

    updateUserExtraUrl = baseUrl + `/${userExtra.id}`;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Success: User must be able to self update - User token - Full body", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userCompleteUpdateFull);

    const expectResults = {
      status: 200,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: "User updated successfully",
    });

    const userUpdate = await userRepo.findOne({
      where: {
        id: userComplete.id,
      },
      relations: {
        socialMedia: true,
      },
    });

    expect(userUpdate?.email).toStrictEqual(userComplete.email);
    expect(userUpdate?.nickname).toStrictEqual(userComplete.nickname);
  });

  it("Success: User must be able to self update - User token - Partial", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userCompleteUpdatePartial);

    const expectResults = {
      status: 200,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({
      message: "User updated successfully",
    });

    const userUpdate = await userRepo.findOne({
      where: {
        id: userComplete.id,
      },
      relations: {
        socialMedia: true,
      },
    });

    expect(userUpdate?.email).toStrictEqual(userComplete.email);
    expect(userUpdate?.nickname).toStrictEqual(userComplete.nickname);
  });

  it("Error: User must not be able to delete another user - User token ", async () => {
    const response = await supertest(app)
      .patch(updateUserExtraUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userCompleteUpdatePartial);

    const expectResults = {
      status: 403,
      message: "Insufficient permission",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual({ message: expectResults.message });
  });

  it("Error: User no be able to self update - User token - Invalid body types", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userUpdateError);

    const expectResults = {
      status: 400,
      bodyMessage: {
        message: {
          name: ["Expected string, received number"],
          password: ["Expected string, received number"],
          socialMedia: [
            "Expected string, received array",
            "Expected string, received number",
            "Expected string, received array",
            "Expected string, received number",
            "Expected string, received array",
          ],
        },
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyMessage);
  });

  it("Error: Must not be able to update - Invalid ID Number", async () => {
    const response = await supertest(app)
      .patch(updateInvalidIDUrlNumber)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userComplete);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: "User not found" });
  });

  it("Error: Must not be able to update - Invalid ID string", async () => {
    const response = await supertest(app)
      .patch(updateInvalidIDUrlString)
      .set(
        "Authorization",
        `Bearer ${generateToken.isValidtoken(
          userComplete.admin!,
          userComplete.email,
          userComplete.id
        )}`
      )
      .send(userUpdateMock.userComplete);

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: "User not found" });
  });

  it("Error: Must not be able to destroy - Missing bearer", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .send(userUpdateMock.userComplete);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "Missing bearer token" });
  });

  it("Error: Must not be able to destroy - Invalid signature", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .set("Authorization", `Bearer ${generateToken.invalidSignature}`)
      .send(userUpdateMock.userComplete);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "invalid signature" });
  });

  it("Error: Must not be able to update - JWT malformed", async () => {
    const response = await supertest(app)
      .patch(updateUserCompleteUrl)
      .set("Authorization", `Bearer ${generateToken.jwtMalformed}`)
      .send(userUpdateMock.userComplete);

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "jwt malformed" });
  });
});
