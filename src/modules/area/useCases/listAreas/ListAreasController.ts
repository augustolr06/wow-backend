import { Request, Response } from "express";
import { ListAreasUseCase } from "./ListAreasUseCase";

export class ListAreasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAreasUseCase = new ListAreasUseCase();

    const areas = await listAreasUseCase.execute();

    return response.status(200).json(areas);
  }
}
