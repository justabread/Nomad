import {
  GameMasterContext,
  GetLocationsWithoutUtilities,
  LocationsObject,
} from "@/Contexts/GameMasterContextProvider";
import { LocationNamesEnum } from "@/Types/LocationTypes";
import { useContext } from "react";

const LocationsSelector = () => {
  const { playerLocation, setPlayerLocation } = useContext(GameMasterContext);

  return (
    playerLocation !== LocationNamesEnum.LOCATION_START && (
      <div>
        <h2>Locations</h2>
        <div>Current Location: {playerLocation}</div>
        {GetLocationsWithoutUtilities().map(([key]) => {
          return (
            <button
              key={key}
              onClick={() => setPlayerLocation(key as LocationNamesEnum)}
            >
              {key}
            </button>
          );
        })}
        <button
          onClick={() =>
            setPlayerLocation(LocationNamesEnum.LOCATION_CAMP_PLAYER)
          }
        >
          Camp
        </button>
      </div>
    )
  );
};

export default LocationsSelector;
