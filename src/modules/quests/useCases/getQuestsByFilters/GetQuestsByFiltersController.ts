import { Request, Response } from "express";
import { GetQuestsByFiltersUseCase } from "./GetQuestsByFiltersUseCase";

export class GetQuestsByFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filters = request.query;

    // tratar os dados vindos da requisição

    const getQuestsByFiltersUseCase = new GetQuestsByFiltersUseCase();

    // const quests = await getQuestsByFiltersUseCase.execute(
    //   // passar as tabelas, atributos e filtros
    // );

    return response.json(quests);
  }
}
