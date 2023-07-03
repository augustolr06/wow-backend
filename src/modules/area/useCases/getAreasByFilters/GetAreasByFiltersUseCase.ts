import { area } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { AreaFiltersDTO } from "../../dtos/AreaFiltersDTO";

export class GetAreasByFiltersUseCase {
  async execute({ attributes, filters }: AreaFiltersDTO): Promise<area[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select =
      attributes.length > 0
        ? attributes.reduce((acc: Record<string, any>, attribute) => {
            if (attribute.table === "area") {
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
            if (filter.table === "area") {
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

    const areas =
      select && where
        ? await prisma.area.findMany({
            select,
            where,
          })
        : !select && where
        ? await prisma.area.findMany({
            where,
          })
        : select && !where
        ? await prisma.area.findMany({
            select,
          })
        : await prisma.area.findMany();

    if (!areas) {
      throw new AppError("Areas not found", 404);
    }

    return areas as area[];
  }
}
