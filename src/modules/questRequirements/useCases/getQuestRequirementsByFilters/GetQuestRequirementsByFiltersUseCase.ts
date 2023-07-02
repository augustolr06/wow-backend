import { quest_requirements } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestRequirementsFiltersDTO } from "../../dtos/QuestRequirementsFiltersDTO";

export class GetQuestRequirementsByFiltersUseCase {
  async execute({
    attributes,
    filters,
  }: QuestRequirementsFiltersDTO): Promise<quest_requirements[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select = attributes?.reduce((acc: Record<string, any>, attribute) => {
      if (attribute.table === "quest_requirements") {
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
      if (filter.table === "quest_requirements") {
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

    const questRequirements = await prisma.quest_requirements.findMany({
      select,
      where,
    });

    if (!questRequirements) {
      throw new AppError("QuestRequirements not found", 404);
    }

    return questRequirements as unknown as quest_requirements[];
  }
}
