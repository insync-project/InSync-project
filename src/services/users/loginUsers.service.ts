import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { sign } from "jsonwebtoken";
import { User } from "../../entities";
import "dotenv/config";
import { ILoginBody, ILoginReturn } from "../../interfaces/users.interfaces";
import { returnLoginSchema } from "../../schemas/users.schemas";

export const loginService = async (
  loginData: ILoginBody
): Promise<ILoginReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const loginToValidate: User | null = await usersRepository.findOneBy([
    { email: loginData.user },
    { nickname: loginData.user },
  ]);

  if (!loginToValidate) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    loginData.password,
    loginToValidate.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    {
      email: loginToValidate.email,
      admin: loginToValidate.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(loginToValidate.id),
    }
  );

  const user: User | null = await usersRepository.findOne({
    where: {
      id: loginToValidate.id,
    },
    relations: {
      userTechnologies: {
        technology: true,
      },
      socialMedia: true,
      project: true,
    },
  });

  const reponseLogin: ILoginReturn = returnLoginSchema.parse({ token, user });

  return reponseLogin;
};
