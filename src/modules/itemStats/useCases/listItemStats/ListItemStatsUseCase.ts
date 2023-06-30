import { item_stats } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class ListItemStatsUseCase {
  async execute(): Promise<item_stats[]> {
    const itemStats = await prisma.item_stats.findMany();

    return itemStats;
  }
}
