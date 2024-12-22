import "@/styles/CommonStyles.css";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { useContext } from "react";
import styles from "./GameWindow.module.css";
import LocationsSelector from "@/components/LocationsSelector/LocationsSelector";
import Journey from "@/components/Journey/Journey";
import { JourneyContextProvider } from "@/Contexts/JourneyContextProvider";

const GameWindow = () => {
  const { player } = useContext(GameMasterContext);

  return (
    <div className={styles.gameWindowContainer}>
      <div className={`${styles.playerStatsContainer} UI-element`}>
        <h2>Player Stats</h2>
        <div>Health: {player.health}</div>
        <div>Equipped Weapon: {player.weapon}</div>
        <div>Food: {player.food}</div>
        <div>First Aid kits: {player.firstAidKits}</div>
        <LocationsSelector />
      </div>

      <JourneyContextProvider>
        <Journey />
      </JourneyContextProvider>
    </div>
  );
};

export default GameWindow;
