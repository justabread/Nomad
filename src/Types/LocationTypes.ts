export enum UtilityLocationsEnum {
  LOCATION_START = "Preparation",
  LOCATION_CAMP_PLAYER = "Your Camp",
  LOCATION_DEATH = "Death",
  LOCATION_FIGHT = "Fight",
}

export enum JourneyLocationsEnum {
  LOCATION_FOREST = "Forest",
  LOCATION_RUINS = "Ruins",
}

export type LocationsType = JourneyLocationsEnum | UtilityLocationsEnum;
