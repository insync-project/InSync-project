import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { SocialMedia, User } from "../../entities";
import { AppError } from "../../errors";
import { IReturnUser, IUpdateUser } from "../../interfaces/users.interfaces";

export const updateUsersService = async (
  req: Request,
  body: IUpdateUser
): Promise<string> => {
  const tokeninfos = req.userTokenInfos;
  const idParams: string = req.params.id;
  if (isNaN(Number(idParams))) {
    throw new AppError("User not found", 404);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const socialMediaRepository: Repository<SocialMedia> =
    AppDataSource.getRepository(SocialMedia);

  const userFind: User | null = await userRepository.findOne({
    where: {
      id: Number(idParams),
    },
    relations: {
      socialMedia: true,
    },
  });

  if (!userFind) {
    throw new AppError("User not found", 404);
  }

  if (!(tokeninfos.id === idParams)) {
    throw new AppError("Insufficient permission", 403);
  }

  const createSocialMedia: SocialMedia = socialMediaRepository.create({
    ...userFind?.socialMedia,
    ...body.socialMedia,
  });

  await socialMediaRepository.save(createSocialMedia);

  const createUser: User = userRepository.create({
    ...userFind,
    name: body.name ? body.name : userFind?.name!,
    password: body.password ? body.password : userFind?.password!,
    description: body.description ? body.description : userFind?.description!,
    avatar: body.avatar ? body.avatar : userFind?.avatar!,
  });

  await userRepository.save(createUser);

  return "User updated successfully";
};
