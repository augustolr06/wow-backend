import { quest } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { QuestDTO } from "../../dtos/QuestDTO";
import { AppError } from "../../../../errors/AppError";

export class GetQuestUseCase {
  async execute(id: QuestDTO["id"]): Promise<quest> {
    const quest = await prisma.quest.findUnique({
      where: {
        id,
      },
    });

    // verificar se a quest existe
    if (!quest) {
      throw new AppError("Quest does not exists!");
    }

    return quest;
  }
}
