import { quest_rewards } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { QuestRewardsDTO } from "../../dtos/QuestRewardsDTO";

export class ListQuestRewardsUseCase {
  async execute(): Promise<quest_rewards[]> {
    const questsRewards = await prisma.quest_rewards.findMany();

    return questsRewards;
  }
}
