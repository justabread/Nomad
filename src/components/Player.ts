import { LocationNamesEnum } from "@/Types/LocationTypes";
import {
  BodyTraitsEnum,
  MindTraitsEnum,
  WeaponsEnum,
} from "@/Types/PlayerTypes";

export interface PlayerInterface {
  health: number;
  weapon: WeaponsEnum;
  food: number;
  firstAidKits: number;
  mindTrait: MindTraitsEnum;
  bodyTrait: BodyTraitsEnum;
  location: LocationNamesEnum;
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
  location: LocationNamesEnum.LOCATION_START,
};
