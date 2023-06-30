import { Request, Response } from "express";
import { GetQuestRequirementUseCase } from "./GetQuestRequirementUseCase";

export class GetQuestRequirementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getQuestRequirementUseCase = new GetQuestRequirementUseCase();

    const questRequirement = await getQuestRequirementUseCase.execute(
      Number(id)
    );

    return response.status(200).json(questRequirement);
  }
}
