import { item } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ItemFiltersDTO } from "../../dtos/ItemFiltersDTO";

export class GetItemsByFiltersUseCase {
  async execute({ attributes, filters }: ItemFiltersDTO): Promise<item[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select = attributes?.reduce((acc: Record<string, any>, attribute) => {
      if (attribute.table === "item") {
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
      if (filter.table === "item") {
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
    }, {});

    const items =
      select && where
        ? await prisma.item.findMany({
            select,
            where,
          })
        : !select && where
        ? await prisma.item.findMany({
            where,
          })
        : !where && select
        ? await prisma.item.findMany({
            select,
          })
        : await prisma.item.findMany();

    if (!items) {
      throw new AppError("Items not found", 404);
    }

    return items as unknown as item[];
  }
}
