import { quest } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestFiltersDTO } from "../../dtos/QuestFiltersDTO";
import { QuestResultsDTO } from "../../dtos/QuestResultsDTO";

export class GetQuestsByFiltersUseCase {
  async execute({
    attributes,
    filters,
  }: QuestFiltersDTO): Promise<QuestResultsDTO[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select = attributes?.reduce((acc: Record<string, any>, attribute) => {
      if (attribute.table === "quest") {
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
      if (filter.table === "quest") {
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

    const quests = await prisma.quest.findMany({
      select,
      where,
    });

    if (!quests) {
      throw new AppError("Quests not found", 404);
    }

    return quests as QuestResultsDTO[];
  }
}
