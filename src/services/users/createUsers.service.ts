import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { SocialMedia, User } from "../../entities";
import {
  ICreateUser,
  IRegisterReturn,
} from "../../interfaces/users.interfaces";
import { returnRegisterSchema } from "../../schemas/users.schemas";
import "dotenv/config";

export const createUsersService = async (
  payload: ICreateUser
): Promise<IRegisterReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const socialMediaRepository: Repository<SocialMedia> =
    AppDataSource.getRepository(SocialMedia);

  const socialMedia: SocialMedia = socialMediaRepository.create({});
  const newSocialMedia: SocialMedia = await socialMediaRepository.save(
    socialMedia
  );

  const user: User = usersRepository.create({
    name: payload.name,
    email: payload.email,
    nickname: payload.nickname,
    password: payload.password,
    admin: payload.admin ? payload.admin : false,
    socialMedia: newSocialMedia,
  });
  const newUser = await usersRepository.save(user);

  const token: string = sign(
    {
      email: newUser.email,
      admin: newUser.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(newUser.id),
    }
  );

  const reponseRegister: IRegisterReturn = returnRegisterSchema.parse({
    token,
    message: "User created successfully!",
  });

  return reponseRegister;
};
