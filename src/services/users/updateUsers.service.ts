import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { SocialMedia, User } from "../../entities";
import { AppError } from "../../errors";
import { IReturnUser, IUpdateUser } from "../../interfaces/users.interfaces";
import { returnFullCreateUserSchema } from "../../schemas/users.schemas";

export const updateUsersService = async (
  req: Request,
  body: IUpdateUser
): Promise<IReturnUser> => {
  const tokeninfos = req.userTokenInfos;
  const idParams: string = req.params.id;
  if (isNaN(Number(idParams))) {
    throw new AppError("User not found", 404);
  }

  if (!(tokeninfos.admin === true || tokeninfos.id === idParams)) {
    throw new AppError("Insufficient permission", 403);
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

  const createSocialMedia: SocialMedia = socialMediaRepository.create({
    ...userFind?.socialMedia,
    ...body.socialMedia,
  });

  const updateSocialMedia: SocialMedia = await socialMediaRepository.save(
    createSocialMedia
  );

  const createUser: User = userRepository.create({
    ...userFind,
    name: body.name ? body.name : userFind?.name!,
    password: body.password ? body.password : userFind?.password!,
    description: body.description ? body.description : userFind?.description!,
    avatar: body.avatar ? body.avatar : userFind?.avatar!,
  });

  const updateUser: User = await userRepository.save(createUser);

  const responseUser: User | null = await userRepository.findOne({
    where: {
      id: Number(idParams),
    },
    relations: {
      userTechnologies: {
        technology: true,
      },
      socialMedia: true,
      project: true,
    },
  });

  const response = returnFullCreateUserSchema.parse(responseUser);
  return response;
};
