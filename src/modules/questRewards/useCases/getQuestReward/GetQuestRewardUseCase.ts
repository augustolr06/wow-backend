import { quest_rewards } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { QuestRewardsDTO } from "../../dtos/QuestRewardsDTO";
import { AppError } from "../../../../errors/AppError";

export class GetQuestRewardUseCase {
  async execute(id: QuestRewardsDTO["id"]): Promise<quest_rewards> {
    const questReward = await prisma.quest_rewards.findUnique({
      where: {
        id,
      },
    });

    if (!questReward) {
      throw new AppError("QuestReward does not exists!");
    }

    return questReward;
  }
}
