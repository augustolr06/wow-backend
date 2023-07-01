import { Request, Response } from "express";
import { GetRelationshipsUseCase } from "./getRelationshipsUseCase";

export class GetRelationshipsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { table } = request.params;
    const getRelationshipsUseCase = new GetRelationshipsUseCase();

    const relationships = await getRelationshipsUseCase.execute(table);

    return response.json(relationships);
  }
}
