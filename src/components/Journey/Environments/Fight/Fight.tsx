import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./Fight.module.css";
import "@/styles/CommonStyles.css";
import { useGenerateRandomNumber } from "../useGenerateRandoms";
import { EnemyInterface } from "@/Types/EnemyTypes";

interface EnemyElementProps {
  index: number;
  enemy: EnemyInterface;
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  playerActionsPerTurn: number;
  setPlayerActionsPerTurn: Dispatch<SetStateAction<number>>;
  setEvents: Dispatch<SetStateAction<string[]>>;
  AddEnemyToMarkedList: (enemyToAdd: EnemyInterface) => void;
}

const MAX_PLAYER_ACTIONS_PER_TURN = 3;

const FindValidEnemies = (enemies: EnemyInterface[]) => {
  var validEnemies: EnemyInterface[] = [];

  enemies.map((enemy) => {
    if (enemy.health > 0) {
      validEnemies.push(enemy);
    }
  });

  return validEnemies;
};

/////////FINISH FIGHT FUNCTIONALITY
///Continue implementing the mark enemy functionality and the turn based attack system

const EnemyElement = ({
  index,
  enemy,
  turn,
  playerActionsPerTurn,
  setPlayerActionsPerTurn,
  setEvents,
  AddEnemyToMarkedList,
}: EnemyElementProps) => {
  const { player, setPlayer } = useContext(GameMasterContext);
  const { name, health } = enemy;

  const isDead: boolean = health <= 0;
  return (
    <div>
      <h2>{name}</h2>
      <h2>{`Health: ${isDead ? "Dead" : health}`}</h2>
      <button
        onClick={() => {
          if (!isDead && playerActionsPerTurn < player.weapon.actionPoints) {
            AddEnemyToMarkedList(enemy);
            setPlayerActionsPerTurn((prev) => prev + 1);
          }
        }}
      >
        Mark Enemy
      </button>
    </div>
  );
};

const Fight = () => {
  const [turn, setTurn] = useState<number>(1);
  const [playerActionsPerTurn, setPlayerActionsPerTurn] = useState<number>(0);
  const [events, setEvents] = useState<string[]>(["The fight has started."]);
  const [isFightOver, setIsFightOver] = useState<boolean>(false);
  const [markedEnemies, setMarkedEnemies] = useState<EnemyInterface[]>([]);

  const { player, setPlayer } = useContext(GameMasterContext);

  const EnemyTurn = () => {
    FindValidEnemies(player.currentFight.enemies).map((enemy) => {
      const inflictedDamage = useGenerateRandomNumber(enemy.maxDamage, 0);

      setPlayer((prev) => ({
        ...prev,
        health: prev.health - inflictedDamage,
      }));
      setEvents((prev) => [
        ...prev,
        inflictedDamage > 0
          ? `Player was hit by ${enemy.name} for ${inflictedDamage} damage.`
          : `${enemy.name} missed.`,
      ]);
    });
  };

  const PlayerTurn = () => {
    const updatedEnemies = [...player.currentFight.enemies];

    markedEnemies.forEach((markedEnemy) => {
      const enemyIndex = updatedEnemies.findIndex(
        (enemy) => enemy.name === markedEnemy.name
      );
      if (enemyIndex === -1) {
        throw new Error(
          `Enemy ${markedEnemy.name} not found in current fight enemies.`
        );
      }

      const inflictedDamage = useGenerateRandomNumber(
        player.weapon.maxDamage,
        player.weapon.minDamage
      );

      updatedEnemies[enemyIndex].health -= inflictedDamage;

      setEvents((prev) => [
        ...prev,
        `${markedEnemy.name} was hit by the Player for ${inflictedDamage} damage.`,
      ]);
    });

    setPlayer((prev) => ({
      ...prev,
      currentFight: {
        ...prev.currentFight,
        enemies: updatedEnemies,
      },
    }));

    setMarkedEnemies([]);
    setPlayerActionsPerTurn(0);
    EnemyTurn();
  };

  const AddEnemyToMarkedList = (enemyToAdd: EnemyInterface) => {
    setMarkedEnemies((prev) => [...prev, enemyToAdd]);
  };

  const EndFight = () => {
    setPlayer((prev) => ({ ...prev, location: prev.currentFight.location }));
  };

  // useEffect(() => {
  //   if (FindValidEnemies(player.currentFight.enemies).length === 0) {
  //     setIsFightOver(true);
  //   }
  //   if (playerActionsPerTurn >= MAX_PLAYER_ACTIONS_PER_TURN) {
  //     EnemyTurn();
  //     setPlayerActionsPerTurn(0);
  //     setTurn((prev) => prev + 1);
  //   }
  // }, [playerActionsPerTurn]);

  return (
    <div className={styles.fightElement}>
      {!isFightOver ? (
        <div className={`UI-element`}>
          {player.currentFight.enemies.map((enemy, i) => {
            return (
              <EnemyElement
                key={i}
                index={i}
                enemy={enemy}
                turn={turn}
                setTurn={setTurn}
                playerActionsPerTurn={playerActionsPerTurn}
                setPlayerActionsPerTurn={setPlayerActionsPerTurn}
                setEvents={setEvents}
                AddEnemyToMarkedList={AddEnemyToMarkedList}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <h1>
            The fight is over and you emerge victorious. You will live to die
            another day.
          </h1>
          <button onClick={EndFight}>Continue</button>
        </div>
      )}

      <div className={`${styles.eventsContainerElement} UI-element`}>
        <h1>Events:</h1>
        <div className={`${styles.eventsListElement}`}>
          {events.map((event, i) => {
            return <div key={i}>{event}</div>;
          })}
        </div>
      </div>
      <div className={`${styles.eventsContainerElement} UI-element`}>
        <h1>Marked Enemies:</h1>
        <button
          onClick={() => {
            if (markedEnemies.length > 0) {
              setMarkedEnemies((prev) => prev.slice(0, -1));
              setPlayerActionsPerTurn((prev) => prev - 1);
            }
          }}
        >
          Undo
        </button>
        <div className={`${styles.eventsListElement}`}>
          <div>
            Player Actions: {playerActionsPerTurn} /{" "}
            {player.weapon.actionPoints}
          </div>
          {markedEnemies.map((enemy, i) => {
            return <div key={i}>{enemy.name}</div>;
          })}
        </div>
        <button onClick={PlayerTurn}>Apply</button>
      </div>
    </div>
  );
};

export default Fight;
