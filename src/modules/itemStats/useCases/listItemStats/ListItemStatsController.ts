import { Request, Response } from "express";
import { ListItemStatsUseCase } from "./ListItemStatsUseCase";

export class ListItemStatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listItemStatsUseCase = new ListItemStatsUseCase();

    const itemStats = await listItemStatsUseCase.execute();

    return response.status(200).json(itemStats);
  }
}
