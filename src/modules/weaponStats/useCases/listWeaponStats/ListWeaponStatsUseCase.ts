import { item_stats, weapon_stats } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class ListWeaponStatsUseCase {
  async execute(): Promise<weapon_stats[]> {
    const weaponStats = await prisma.weapon_stats.findMany();

    return weaponStats;
  }
}
