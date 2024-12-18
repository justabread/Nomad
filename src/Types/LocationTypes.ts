import { JSX } from "react";

export enum LocationNamesEnum {
  LOCATION_START = "Preparation",
  LOCATION_FOREST = "Forest",
  LOCATION_RUINS = "Ruins",
}

export interface LocationsObjectInterface {
  name: LocationNamesEnum;
  component: () => JSX.Element;
}
