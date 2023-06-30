import { Request, Response } from "express";
import { ListItemsUseCase } from "./ListItemsUseCase";

export class ListItemsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listItemsUseCase = new ListItemsUseCase();

    const items = await listItemsUseCase.execute();

    return response.status(200).json(items);
  }
}
