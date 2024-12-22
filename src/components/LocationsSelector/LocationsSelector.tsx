import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { LocationNamesEnum } from "@/Types/LocationTypes";
import { useContext } from "react";
import { GetLocationsWithoutUtilities } from "../Locations";

const LocationsSelector = () => {
  const { player, setPlayerLocation } = useContext(GameMasterContext);

  return (
    player.location !== LocationNamesEnum.LOCATION_START && (
      <div>
        <h2>Locations</h2>
        <div>Current Location: {player.location}</div>
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
        <button
          onClick={() => setPlayerLocation(LocationNamesEnum.LOCATION_FIGHT)}
        >
          Fight
        </button>
      </div>
    )
  );
};

export default LocationsSelector;
