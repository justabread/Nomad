import { JSX } from "react";

export enum LocationNamesEnum {
  LOCATION_START = "Preparation",
  LOCATION_CAMP_PLAYER = "Your Camp",
  LOCATION_DEATH = "Death",
  LOCATION_FOREST = "Forest",
  LOCATION_RUINS = "Ruins",
}

export interface LocationsObjectInterface {
  name: LocationNamesEnum;
  component: () => JSX.Element;
  utilityLocation?: boolean;
}
