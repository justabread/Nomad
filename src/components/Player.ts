import { LocationsType, UtilityLocationsEnum } from "@/Types/LocationTypes";
import { BodyTraitsEnum, MindTraitsEnum } from "@/Types/PlayerTypes";

import { WeaponInterface, WeaponNamesEnum } from "@/Types/ItemTypes";
import { GetWeaponByName } from "./Weapons";

export interface PlayerInterface {
  health: number;
  weapon: WeaponInterface;
  foodItems: number;
  healthItems: number;
  mindTrait: MindTraitsEnum;
  bodyTrait: BodyTraitsEnum;
  location: { name: LocationsType; props?: any };
}

/**
 * InitialPlayerState
 *
 * @remarks
 * The initial state of the player
 */
export const InitialPlayerState: PlayerInterface = {
  health: 100,
  weapon: GetWeaponByName(WeaponNamesEnum.UNARMED_FISTS),
  foodItems: 0,
  healthItems: 5,
  mindTrait: MindTraitsEnum.NO_MIND_TRAIT,
  bodyTrait: BodyTraitsEnum.NO_BODY_TRAIT,
  location: { name: UtilityLocationsEnum.LOCATION_START },
};
