import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import {
  JourneyLocationsEnum,
  UtilityLocationsEnum,
} from "@/Types/LocationTypes";

import { useContext } from "react";
import { JourneyLocationElements, UtilityLocationElements } from "../Locations";

const LocationsSelector = () => {
  const { player, setPlayerLocation } = useContext(GameMasterContext);

  return (
    player.location.name !== UtilityLocationsEnum.LOCATION_START && (
      <div>
        <h2>Locations</h2>
        <div>Current Location: {player.location.name}</div>
        {JourneyLocationElements().map((element, i) => {
          return (
            <button
              key={i}
              onClick={() =>
                setPlayerLocation(element.name as JourneyLocationsEnum)
              }
            >
              {element.name}
            </button>
          );
        })}
        <button
          onClick={() =>
            setPlayerLocation(UtilityLocationsEnum.LOCATION_CAMP_PLAYER)
          }
        >
          Camp
        </button>
        <button
          onClick={() => setPlayerLocation(UtilityLocationsEnum.LOCATION_FIGHT)}
        >
          Fight
        </button>
      </div>
    )
  );
};

export default LocationsSelector;
