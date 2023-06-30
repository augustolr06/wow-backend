import { Request, Response } from "express";
import { GetItemStatUseCase } from "./GetItemStatUseCase";

export class GetItemStatController {
  async handle(
    requestItemStat: Request,
    response: Response
  ): Promise<Response> {
    const { id } = requestItemStat.params;

    const getItemStatUseCase = new GetItemStatUseCase();

    const itemStat = await getItemStatUseCase.execute(Number(id));

    return response.status(200).json(itemStat);
  }
}
