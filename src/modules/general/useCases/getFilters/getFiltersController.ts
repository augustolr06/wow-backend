import { Request, Response } from "express";
import { GetFiltersUseCase } from "./getFiltersUseCase";

export class GetFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { table } = request.params;
    const getFIltersUseCase = new GetFiltersUseCase();

    const filters = await getFIltersUseCase.execute(table);

    return response.json(filters);
  }
}
