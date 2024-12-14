import {
  GameMasterContext,
  LocationsObject,
} from "@/Contexts/GameMasterContextProvider";
import { Locations } from "@/Types/LocationTypes";
import { useContext } from "react";

const LocationsSelector = () => {
  const { playerLocation, setPlayerLocation } = useContext(GameMasterContext);

  return (
    <div>
      <h2>Locations</h2>
      <div>Current Location: {playerLocation.name}</div>
      <button
        onClick={() =>
          setPlayerLocation(LocationsObject[Locations.LOCATION_FOREST])
        }
      >
        Forest
      </button>
      <button
        onClick={() =>
          setPlayerLocation(LocationsObject[Locations.LOCATION_RUINS])
        }
      >
        Ruins
      </button>
    </div>
  );
};

export default LocationsSelector;
