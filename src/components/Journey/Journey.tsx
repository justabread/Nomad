import { useContext } from "react";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { GetLocationComponentByName } from "../Locations";
import { JourneyLocationsEnum } from "@/Types/LocationTypes";

const Journey = () => {
  const { player } = useContext(GameMasterContext);

  const LocationComponent = GetLocationComponentByName(
    player.location
  ).component;

  return (
    <div>
      <LocationComponent />
    </div>
  );
};

export default Journey;
