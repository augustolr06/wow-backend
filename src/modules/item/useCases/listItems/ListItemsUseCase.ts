import { item } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class ListItemsUseCase {
  async execute(): Promise<item[]> {
    const items = await prisma.item.findMany();

    return items;
  }
}
