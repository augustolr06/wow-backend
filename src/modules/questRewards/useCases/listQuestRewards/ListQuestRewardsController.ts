import { Request, Response } from "express";
import { ListQuestRewardsUseCase } from "./ListQuestRewardsUseCase";

export class ListQuestRewardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listQuestRewardsUseCase = new ListQuestRewardsUseCase();

    const questsRewards = await listQuestRewardsUseCase.execute();

    return response.status(200).json(questsRewards);
  }
}
