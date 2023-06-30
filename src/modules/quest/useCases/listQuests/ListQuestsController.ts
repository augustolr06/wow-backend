import { Request, Response } from "express";
import { ListQuestsUseCase } from "./ListQuestsUseCase";

export class ListQuestsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listQuestsUseCase = new ListQuestsUseCase();

    const quests = await listQuestsUseCase.execute();

    return response.status(200).json(quests);
  }
}
