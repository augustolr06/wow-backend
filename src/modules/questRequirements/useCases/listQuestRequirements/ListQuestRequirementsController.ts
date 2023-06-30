import { Request, Response } from "express";
import { ListQuestRequirementsUseCase } from "./ListQuestRequirementsUseCase";

export class ListQuestRequirementsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listQuestRequirementsUseCase = new ListQuestRequirementsUseCase();

    const questRequirements = await listQuestRequirementsUseCase.execute();

    return response.status(200).json(questRequirements);
  }
}
