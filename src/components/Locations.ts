import {
  JourneyLocationsEnum,
  UtilityLocationsEnum,
  LocationsType,
} from "@/Types/LocationTypes";
import Preparation from "./Preparation/Preparation";
import PlayerCamp from "./Journey/Locations/PlayerCamp/PlayerCamp";
import Death from "./Journey/Locations/Death/Death";
import Forest from "./Journey/Locations/Forest/Forest";
import Ruins from "./Journey/Locations/Ruins/Ruins";
import Fight from "./Journey/Locations/Fighting/Fighting";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import Looting from "./Journey/Locations/Looting/Looting";
import { RuinsEvents } from "./Journey/Locations/Ruins/RuinsEvents";
import { ForestEvents } from "./Journey/Locations/Forest/ForestEvents";

export const JourneyLocationElements =
  (): NameWithComponentInterface<JourneyLocationsEnum>[] => [
    {
      name: JourneyLocationsEnum.LOCATION_FOREST,
      component: Forest,
      events: ForestEvents,
    },
    {
      name: JourneyLocationsEnum.LOCATION_RUINS,
      component: Ruins,
      events: RuinsEvents,
    },
  ];

export const UtilityLocationElements =
  (): NameWithComponentInterface<UtilityLocationsEnum>[] => [
    {
      name: UtilityLocationsEnum.LOCATION_START,
      component: Preparation,
    },
    {
      name: UtilityLocationsEnum.LOCATION_CAMP_PLAYER,
      component: PlayerCamp,
    },
    {
      name: UtilityLocationsEnum.LOCATION_DEATH,
      component: Death,
    },
    {
      name: UtilityLocationsEnum.LOCATION_FIGHT,
      component: Fight,
    },
    { name: UtilityLocationsEnum.LOCATION_LOOTING, component: Looting },
  ];

// export const GetJourneyLocationComponent = (
//   locationName: JourneyLocationsEnum
// ): NameWithComponentInterface<JourneyLocationsEnum> => {
//   const locationObject = JourneyLocationElements.find(
//     (element) => element.name === locationName
//   );

//   if (!locationObject) {
//     throw new Error(`Journey Location ${locationName} not found`);
//   }

//   return locationObject;
// };

// export const GetUtilityLocationComponent = (
//   locationName: UtilityLocationsEnum
// ): NameWithComponentInterface<UtilityLocationsEnum> => {
//   const locationObject = UtilityLocationElements.find(
//     (element) => element.name === locationName
//   );

//   if (!locationObject) {
//     throw new Error(`Utility Location ${locationName} not found`);
//   }

//   return locationObject;
// };

export const GetAllLocationComponents = () => {
  return [...JourneyLocationElements(), ...UtilityLocationElements()];
};

export const GetLocationComponentByName = (
  locationName: LocationsType
): NameWithComponentInterface<LocationsType> => {
  const locationObject = GetAllLocationComponents().find(
    (element) => element.name === locationName
  );

  if (!locationObject) {
    throw new Error(`Location ${locationName} not found`);
  }

  return locationObject;
};
