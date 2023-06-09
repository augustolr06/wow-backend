import { quest } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { QuestDTO } from "../../dtos/QuestDTO";

export class ListQuestsUseCase {
  async execute(): Promise<quest[]> {
    const quests = await prisma.quest.findMany();

    return quests;
  }
}
