import { Request, Response } from "express";
import { ListWeaponStatsUseCase } from "./ListWeaponStatsUseCase";

export class ListWeaponStatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listWeaponStatsUseCase = new ListWeaponStatsUseCase();

    const weaponStats = await listWeaponStatsUseCase.execute();

    return response.status(200).json(weaponStats);
  }
}
