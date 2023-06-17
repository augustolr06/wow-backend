import { Request, Response } from "express";
import { GetTablesUseCase } from "./GetTablesUseCase";

export class GetTablesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getTablesAndColumnsNamesUseCase = new GetTablesUseCase();

    const tablesAndColumnsNames =
      await getTablesAndColumnsNamesUseCase.execute();

    return response.json(tablesAndColumnsNames);
  }
}
