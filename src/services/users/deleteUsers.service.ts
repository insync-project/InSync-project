import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const deleteUsersService = async (req: Request): Promise<void> => {
  const tokeninfos = req.userTokenInfos;
  const idParams: string = req.params.id;
  if (isNaN(Number(idParams))) {
    throw new AppError("User not found", 404);
  }

  if (tokeninfos.admin === true || tokeninfos.id === idParams) {
    const userRepository = AppDataSource.getRepository(User);

    const userFind = await userRepository.findOneBy({
      id: Number(idParams),
    });

    if (!userFind) {
      throw new AppError("User not found", 404);
    }

    await userRepository.softRemove(userFind!);
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};
