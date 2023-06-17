import { Request, Response } from "express";
import { GetColumnsByTableUseCase } from "./GetColumnsByTableUseCase";

export class GetColumnsByTableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { table } = request.params;
    const getColumnsByTableUseCase = new GetColumnsByTableUseCase();

    const tablesAndColumnsNames = await getColumnsByTableUseCase.execute(table);

    return response.json(tablesAndColumnsNames);
  }
}
