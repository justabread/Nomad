import { useContext } from "react";
import Forest from "./Environments/Forest/Forest";
import Ruins from "./Environments/Ruins/Ruins";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { EnemyInterface } from "../Player";
import { LocationsObject } from "../Locations";
import { LocationNamesEnum } from "@/Types/LocationTypes";
const Journey = () => {
  const { player, setPlayer, setPlayerLocation } =
    useContext(GameMasterContext);

  const InitiateFight = (fight: {
    location: LocationNamesEnum;
    enemies: EnemyInterface[];
  }) => {
    setPlayer((prev) => ({
      ...prev,
      currentFight: fight,
    }));
    setPlayerLocation(LocationNamesEnum.LOCATION_FIGHT);
  };

  const LocationComponent = LocationsObject[player.location].component;
  return (
    <div>
      <LocationComponent InitiateFight={InitiateFight} />
    </div>
  );
};

export default Journey;
