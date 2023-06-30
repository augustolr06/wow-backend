import { item_stats } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ItemStatsDTO } from "../../dtos/ItemStatsDTO";
import { AppError } from "../../../../errors/AppError";

export class GetItemStatUseCase {
  async execute(id: ItemStatsDTO["id"]): Promise<item_stats> {
    const itemStat = await prisma.item_stats.findUnique({
      where: {
        id,
      },
    });

    if (!itemStat) {
      throw new AppError("ItemStat does not exists!");
    }

    return itemStat;
  }
}
