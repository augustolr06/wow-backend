import { Request, Response } from "express";
import { GetEnumValuesUseCase } from "./getEnumValuesUseCase";

export class GetEnumValuesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getEnumValuesUseCase = new GetEnumValuesUseCase();

    const enumValues = await getEnumValuesUseCase.execute();

    return response.json(enumValues);
  }
}
