import Preparation from "@/components/Preparation/Preparation";
import {
  GameMasterContext,
  LocationsObject,
} from "@/Contexts/GameMasterContextProvider";
import { useContext } from "react";
import styles from "./GameWindow.module.css";
import LocationsSelector from "@/components/LocationsSelector/LocationsSelector";

const GameWindow = () => {
  const { player, playerLocation } = useContext(GameMasterContext);

  const LocationComponent = playerLocation.component;
  return (
    <div className={styles.gameWindowContainer}>
      <div className={styles.playerStatsContainer}>
        <h2>Player Stats</h2>
        <div>Health: {player.health}</div>
        <div>Equipped Weapon: {player.weapon}</div>
        <div>Mind Trait: {player.mindTrait}</div>
        <div>Body Trait: {player.bodyTrait}</div>
        <LocationsSelector />
      </div>

      <LocationComponent />
    </div>
  );
};

export default GameWindow;
