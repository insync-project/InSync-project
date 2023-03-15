import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { sign } from "jsonwebtoken";
import { User } from "../../entities";
import "dotenv/config";
import { ILoginBody } from "../../interfaces/users.interfaces";

export const loginService = async (loginData: ILoginBody): Promise<string> => {
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

  return token;
};
