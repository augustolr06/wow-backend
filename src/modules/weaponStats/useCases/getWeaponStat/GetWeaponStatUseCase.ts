import { weapon_stats } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { WeaponStatsDTO } from "../../dtos/WeaponStatsDTO";
import { AppError } from "../../../../errors/AppError";

export class GetWeaponStatUseCase {
  async execute(id: WeaponStatsDTO["id"]): Promise<weapon_stats> {
    const weaponStat = await prisma.weapon_stats.findUnique({
      where: {
        id,
      },
    });

    if (!weaponStat) {
      throw new AppError("WeaponStat does not exists!");
    }

    return weaponStat;
  }
}
