import { Request, Response } from "express";
import { GetItemUseCase } from "./GetItemUseCase";

export class GetItemController {
  async handle(requestItem: Request, response: Response): Promise<Response> {
    const { id } = requestItem.params;

    const getItemUseCase = new GetItemUseCase();

    const item = await getItemUseCase.execute(Number(id));

    return response.status(200).json(item);
  }
}
