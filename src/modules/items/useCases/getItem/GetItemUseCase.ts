import { item } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ItemDTO } from "../../dtos/ItemDTO";
import { AppError } from "../../../../errors/AppError";

export class GetItemUseCase {
  async execute(id: ItemDTO["id"]): Promise<item> {
    const items = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    // verificar se a quest existe
    if (!items) {
      throw new AppError("Quest does not exists!");
    }

    return items;
  }
}
