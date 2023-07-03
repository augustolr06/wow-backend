import { item_stats } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ItemStatsFiltersDTO } from "../../dtos/ItemStatsFiltersDTO";

export class GetItemStatsByFiltersUseCase {
  async execute({
    attributes,
    filters,
  }: ItemStatsFiltersDTO): Promise<item_stats[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select =
      attributes.length > 0
        ? attributes.reduce((acc: Record<string, any>, attribute) => {
            if (attribute.table === "item_stats") {
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
            if (filter.table === "item_stats") {
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

    const itemStats =
      select && where
        ? await prisma.item_stats.findMany({
            select,
            where,
          })
        : !select && where
        ? await prisma.item_stats.findMany({
            where,
          })
        : select && !where
        ? await prisma.item_stats.findMany({
            select,
          })
        : await prisma.item_stats.findMany();

    if (!itemStats) {
      throw new AppError("ItemStats not found", 404);
    }

    return itemStats as item_stats[];
  }
}
