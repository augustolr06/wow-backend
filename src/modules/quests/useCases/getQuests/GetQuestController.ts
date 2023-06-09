import { Request, Response } from "express";
import { GetQuestUseCase } from "./GetQuestUseCase";

export class GetQuestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getQuestUseCase = new GetQuestUseCase();

    const quest = await getQuestUseCase.execute(Number(id));

    return response.status(200).json(quest);
  }
}
