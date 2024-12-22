import {
  JourneyLocationsEnum,
  LocationsType,
  UtilityLocationsEnum,
} from "@/Types/LocationTypes";
import {
  BodyTraitsEnum,
  MindTraitsEnum,
  WeaponsEnum,
} from "@/Types/PlayerTypes";

export interface EnemyInterface {
  name: string;
  health: number;
  maxDamageDealt: number;
}

export interface PlayerInterface {
  health: number;
  weapon: WeaponsEnum;
  food: number;
  firstAidKits: number;
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
  weapon: WeaponsEnum.UNARMED,
  food: 0,
  firstAidKits: 0,
  mindTrait: MindTraitsEnum.NO_MIND_TRAIT,
  bodyTrait: BodyTraitsEnum.NO_BODY_TRAIT,
  location: UtilityLocationsEnum.LOCATION_START,
  currentFight: { location: JourneyLocationsEnum.LOCATION_FOREST, enemies: [] },
};
