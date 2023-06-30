import { item } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ItemDTO } from "../../dtos/ItemDTO";
import { AppError } from "../../../../errors/AppError";

export class GetItemUseCase {
  async execute(id: ItemDTO["id"]): Promise<item> {
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new AppError("Item does not exists!");
    }

    return item;
  }
}
