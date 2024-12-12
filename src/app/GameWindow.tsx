import Forest from "@/components/Journey/Environments/Forest/Forest";
import Preparation from "@/components/Preparation/Preparation";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { useContext } from "react";
import styles from "./GameWindow.module.css";

const GameWindow = () => {
  const { player, canRender } = useContext(GameMasterContext);
  return (
    <div className={styles.gameWindowContainer}>
      <div className={styles.playerStatsContainer}>
        <h2>Player Stats</h2>
        <div>Health: {player.health}</div>
        <div>Equipped Weapon: {player.weapon}</div>
        <div>Mind Trait: {player.mindTrait}</div>
        <div>Body Trait: {player.bodyTrait}</div>
      </div>

      {canRender.preparation && <Preparation />}
      {canRender.forest && <Forest />}
    </div>
  );
};

export default GameWindow;
