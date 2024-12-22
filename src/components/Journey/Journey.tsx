import { useContext } from "react";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { GetLocationComponent } from "../Locations";
import { JourneyLocationsEnum } from "@/Types/LocationTypes";

const Journey = () => {
  const { player } = useContext(GameMasterContext);

  const LocationComponent = GetLocationComponent(player.location).component;

  return (
    <div>
      <LocationComponent />
    </div>
  );
};

export default Journey;
