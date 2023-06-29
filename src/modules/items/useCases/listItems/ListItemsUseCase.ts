import { item } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ItemDTO } from "../../dtos/ItemDTO";

export class ListItemsUseCase {
  async execute(): Promise<item[]> {
    const items = await prisma.item.findMany();

    return items;
  }
}
