import { Request, Response } from "express";
import { GetAreaUseCase } from "./GetAreaUseCase";

export class GetAreaController {
  async handle(requestArea: Request, response: Response): Promise<Response> {
    const { id } = requestArea.params;

    const getAreaUseCase = new GetAreaUseCase();

    const area = await getAreaUseCase.execute(Number(id));

    return response.status(200).json(area);
  }
}
