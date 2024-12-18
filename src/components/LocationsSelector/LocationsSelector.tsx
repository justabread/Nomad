import {
  GameMasterContext,
  LocationsObject,
} from "@/Contexts/GameMasterContextProvider";
import { LocationNamesEnum } from "@/Types/LocationTypes";
import { useContext } from "react";

const LocationsSelector = () => {
  const { playerLocation, setPlayerLocation } = useContext(GameMasterContext);

  const movePlayerToLocation = (location: LocationNamesEnum) => {
    return () => setPlayerLocation(location);
  };

  return (
    playerLocation !== LocationNamesEnum.LOCATION_START && (
      <div>
        <h2>Locations</h2>
        <div>Current Location: {playerLocation}</div>
        <button
          onClick={movePlayerToLocation(LocationNamesEnum.LOCATION_FOREST)}
        >
          Forest
        </button>
        <button
          onClick={movePlayerToLocation(LocationNamesEnum.LOCATION_RUINS)}
        >
          Ruins
        </button>
      </div>
    )
  );
};

export default LocationsSelector;
