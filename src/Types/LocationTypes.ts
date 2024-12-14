import { JSX } from "react";

export enum Locations {
  LOCATION_START,
  LOCATION_FOREST,
  LOCATION_RUINS,
}

export interface LocationsObjectInterface {
  name: string;
  component: () => JSX.Element;
}
