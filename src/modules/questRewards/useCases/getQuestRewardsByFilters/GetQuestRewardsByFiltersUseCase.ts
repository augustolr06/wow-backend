import { quest_rewards } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { QuestRewardsFiltersDTO } from "../../dtos/QuestRewardsFiltersDTO";

export class GetQuestRewardsByFiltersUseCase {
  async execute({
    attributes,
    filters,
  }: QuestRewardsFiltersDTO): Promise<quest_rewards[]> {
    if (!attributes || !filters) {
      throw new AppError("Attributes not found", 404);
    }

    const select = attributes?.reduce((acc: Record<string, any>, attribute) => {
      if (attribute.table === "quest_rewards") {
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
      if (filter.table === "quest_rewards") {
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

    const questRewards = await prisma.quest_rewards.findMany({
      select,
      where,
    });

    if (!questRewards) {
      throw new AppError("QuestsRewards not found", 404);
    }

    return questRewards as unknown as quest_rewards[];
  }
}
