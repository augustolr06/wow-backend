import { Request, Response } from "express";
import { GetWeaponStatUseCase } from "./GetWeaponStatUseCase";

export class GetWeaponStatController {
  async handle(
    requestWeaponStats: Request,
    response: Response
  ): Promise<Response> {
    const { id } = requestWeaponStats.params;

    const getWeaponStatUseCase = new GetWeaponStatUseCase();

    const weaponStat = await getWeaponStatUseCase.execute(Number(id));

    return response.status(200).json(weaponStat);
  }
}
