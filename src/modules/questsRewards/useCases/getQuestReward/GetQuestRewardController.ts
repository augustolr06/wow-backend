import { Request, Response } from "express";
import { GetQuestRewardUseCase } from "./GetQuestRewardUseCase";

export class GetQuestRewardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getQuestRewardUseCase = new GetQuestRewardUseCase();

    const questReward = await getQuestRewardUseCase.execute(Number(id));

    return response.status(200).json(questReward);
  }
}
