import "@/styles/CommonStyles.css";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { useContext } from "react";
import styles from "./GameWindow.module.css";
import Journey from "@/components/Journey/Journey";
import { JourneyContextProvider } from "@/Contexts/JourneyContextProvider";

const GameWindow = () => {
  const { player } = useContext(GameMasterContext);

  return (
    <div className={styles.gameWindowContainer}>
      <div className={`${styles.playerStatsContainer} UI-element`}>
        <h2>Player Stats</h2>
        <div>Health: {player.health}</div>
        <div>Equipped Weapon: {player.weapon.name}</div>
        <div>Food: {player.foodItems}</div>
        <div>First Aid kits: {player.healthItems}</div>
      </div>
      <JourneyContextProvider>
        <Journey />
      </JourneyContextProvider>
    </div>
  );
};

export default GameWindow;
