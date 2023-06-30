import { quest_requirements } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { QuestRequirementsDTO } from "../../dtos/QuestRequirementsDTO";
import { AppError } from "../../../../errors/AppError";

export class GetQuestRequirementUseCase {
  async execute(id: QuestRequirementsDTO["id"]): Promise<quest_requirements> {
    const questRequirement = await prisma.quest_requirements.findUnique({
      where: {
        id,
      },
    });

    if (!questRequirement) {
      throw new AppError("QuestRequirement does not exists!");
    }

    return questRequirement;
  }
}
