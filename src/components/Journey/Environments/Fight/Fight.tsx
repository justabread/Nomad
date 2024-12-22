import { EnemyInterface } from "@/components/Player";
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

interface EnemyElementProps {
  index: number;
  enemy: EnemyInterface;
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  setPlayerActionsPerTurn: Dispatch<SetStateAction<number>>;
  setEvents: Dispatch<SetStateAction<string[]>>;
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

const EnemyElement = ({
  index,
  enemy,
  turn,
  setPlayerActionsPerTurn,
  setEvents,
}: EnemyElementProps) => {
  const { player, setPlayer } = useContext(GameMasterContext);
  const { name, health, maxDamageDealt } = enemy;

  const isDead: boolean = health <= 0;
  return (
    <div>
      <h2>{name}</h2>
      <h2>{`State: ${isDead ? "Dead" : health}`}</h2>
      <button
        onClick={() => {
          const newHealth = health - 10;

          if (!isDead) {
            setPlayer((prev) => ({
              ...prev,
              currentFight: {
                ...prev.currentFight,
                enemies: prev.currentFight.enemies.map((enemy, idx) =>
                  idx === index ? { ...enemy, health: newHealth } : enemy
                ),
              },
            }));

            setPlayerActionsPerTurn((prev) => prev + 1);

            setEvents((prev) => [...prev, `Player hit ${name} for 10 damage.`]);
          }
        }}
      >
        Attack
      </button>
    </div>
  );
};

const Fight = () => {
  const [turn, setTurn] = useState<number>(1);
  const [playerActionsPerTurn, setPlayerActionsPerTurn] = useState<number>(0);
  const [events, setEvents] = useState<string[]>(["The fight has started"]);
  const [isFightOver, setIsFightOver] = useState<boolean>(false);

  const { player, setPlayer } = useContext(GameMasterContext);

  const EnemyTurn = () => {
    FindValidEnemies(player.currentFight.enemies).map((enemy) => {
      setPlayer((prev) => ({ ...prev, health: prev.health - 2 }));
      setEvents((prev) => [
        ...prev,
        `Player was hit by ${enemy.name} for 2 damage.`,
      ]);
    });
  };

  const EndFight = () => {
    setPlayer((prev) => ({ ...prev, location: prev.currentFight.location }));
  };

  useEffect(() => {
    if (FindValidEnemies(player.currentFight.enemies).length === 0) {
      setIsFightOver(true);
    }
    if (playerActionsPerTurn >= MAX_PLAYER_ACTIONS_PER_TURN) {
      EnemyTurn();
      setPlayerActionsPerTurn(0);
      setTurn((prev) => prev + 1);
    }
  }, [playerActionsPerTurn]);

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
                setPlayerActionsPerTurn={setPlayerActionsPerTurn}
                setEvents={setEvents}
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
    </div>
  );
};

export default Fight;
