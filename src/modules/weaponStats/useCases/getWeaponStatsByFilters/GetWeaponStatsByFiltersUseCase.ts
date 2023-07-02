import { weapon_stats } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { WeaponStatsFiltersDTO } from "../../dtos/WeaponStatsFiltersDTO";

export class GetWeaponStatsByFiltersUseCase {
  async execute({
    attributes,
    filters,
  }: WeaponStatsFiltersDTO): Promise<weapon_stats[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select = attributes?.reduce((acc: Record<string, any>, attribute) => {
      if (attribute.table === "weapon_stats") {
        return {
          ...acc,
          [attribute.column]: true,
        };
      }

      return {
        ...acc,
        [attribute.table]: {
          select: {
            ...acc[attribute.table]?.select,
            [attribute.column]: true,
          },
        },
      };
    }, {});

    const where = filters?.reduce((acc, filter) => {
      if (filter.table === "weapon_stats") {
        return {
          ...acc,
          [filter.column]: {
            [filter.operator]: filter.value,
            mode: "insensitive",
          },
        };
      }

      return {
        ...acc,
        [filter.table]: {
          [filter.column]: {
            [filter.operator]: filter.value,
            mode: "insensitive",
          },
        },
      };
    }, {});

    const weaponStats = await prisma.weapon_stats.findMany({
      select,
      where,
    });

    if (!weaponStats) {
      throw new AppError("WeaponStats not found", 404);
    }

    return weaponStats as unknown as weapon_stats[];
  }
}
