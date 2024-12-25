import {
  JourneyLocationsEnum,
  LocationsType,
  UtilityLocationsEnum,
} from "@/Types/LocationTypes";
import { BodyTraitsEnum, MindTraitsEnum } from "@/Types/PlayerTypes";

import { WeaponInterface, WeaponNamesEnum } from "@/Types/ItemTypes";
import { GetWeaponByName } from "./Weapons";
import { EnemyInterface } from "@/Types/EnemyTypes";

export interface PlayerInterface {
  health: number;
  weapon: WeaponInterface;
  foodItems: number;
  aidItems: number;
  mindTrait: MindTraitsEnum;
  bodyTrait: BodyTraitsEnum;
  location: LocationsType;
  currentFight: { location: JourneyLocationsEnum; enemies: EnemyInterface[] };
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
  aidItems: 0,
  mindTrait: MindTraitsEnum.NO_MIND_TRAIT,
  bodyTrait: BodyTraitsEnum.NO_BODY_TRAIT,
  location: UtilityLocationsEnum.LOCATION_START,
  currentFight: { location: JourneyLocationsEnum.LOCATION_FOREST, enemies: [] },
};
