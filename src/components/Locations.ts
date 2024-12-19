import {
  LocationNamesEnum,
  LocationsObjectInterface,
} from "@/Types/LocationTypes";
import Preparation from "./Preparation/Preparation";
import PlayerCamp from "./Journey/Environments/PlayerCamp/PlayerCamp";
import Death from "./Journey/Environments/Death/Death";
import Forest from "./Journey/Environments/Forest/Forest";
import Ruins from "./Journey/Environments/Ruins/Ruins";

export const GetLocationsWithoutUtilities = () => {
  const locationsWithoutUtilities = Object.entries(LocationsObject).filter(
    ([key, value]) =>
      value.utilityLocation === undefined || value.utilityLocation === false
  );

  return locationsWithoutUtilities;
};

/**
 * LocationsObject
 *
 * @remarks
 * The object contains all the locations in the game
 */
export const LocationsObject: Record<
  LocationNamesEnum,
  LocationsObjectInterface
> = {
  [LocationNamesEnum.LOCATION_START]: {
    name: LocationNamesEnum.LOCATION_START,
    component: Preparation,
    utilityLocation: true,
  },
  [LocationNamesEnum.LOCATION_CAMP_PLAYER]: {
    name: LocationNamesEnum.LOCATION_CAMP_PLAYER,
    component: PlayerCamp,
    utilityLocation: true,
  },
  [LocationNamesEnum.LOCATION_DEATH]: {
    name: LocationNamesEnum.LOCATION_DEATH,
    component: Death,
    utilityLocation: true,
  },
  [LocationNamesEnum.LOCATION_FOREST]: {
    name: LocationNamesEnum.LOCATION_FOREST,
    component: Forest,
  },
  [LocationNamesEnum.LOCATION_RUINS]: {
    name: LocationNamesEnum.LOCATION_RUINS,
    component: Ruins,
  },
};
