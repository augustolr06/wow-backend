import { Request, Response } from "express";
import { GetQuestsByFiltersUseCase } from "./GetQuestsByFiltersUseCase";

export class GetQuestsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    const getQuestsByFiltersUseCase = new GetQuestsByFiltersUseCase();

    const quests = await getQuestsByFiltersUseCase.execute({
      ...filters,
    });

    return response.json(quests);
  }
}
