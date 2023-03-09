import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { SocialMedia, User } from "../../entities";
import {
  ICreateUser,
  IReturnCreateUserFull,
} from "../../interfaces/users.interfaces";
import { returnFullCreateUserSchema } from "../../schemas/users.schemas";

export const createUsersService = async (
  payload: ICreateUser
): Promise<IReturnCreateUserFull> => {
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

  const response: IReturnCreateUserFull =
    returnFullCreateUserSchema.parse(newUser);

  return response;
};
