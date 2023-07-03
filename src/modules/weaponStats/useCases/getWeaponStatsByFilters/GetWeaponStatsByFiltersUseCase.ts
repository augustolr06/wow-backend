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

    const select =
      attributes.length > 0
        ? attributes.reduce((acc: Record<string, any>, attribute) => {
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
          }, {})
        : null;

    const where =
      filters.length > 0
        ? filters.reduce((acc, filter) => {
            if (filter.table === "weapon_stats") {
              return {
                ...acc,
                [filter.column]: {
                  [filter.operator]: filter.value,
                },
              };
            }

            return {
              ...acc,
              [filter.table]: {
                [filter.column]: {
                  [filter.operator]: filter.value,
                },
              },
            };
          }, {})
        : null;

    const weaponStats =
      select && where
        ? await prisma.weapon_stats.findMany({
            select,
            where,
          })
        : !select && where
        ? await prisma.weapon_stats.findMany({
            where,
          })
        : !where && select
        ? await prisma.weapon_stats.findMany({
            select,
          })
        : await prisma.weapon_stats.findMany();

    if (!weaponStats) {
      throw new AppError("WeaponStats not found", 404);
    }

    return weaponStats as weapon_stats[];
  }
}
