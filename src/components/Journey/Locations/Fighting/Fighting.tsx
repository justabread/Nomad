import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "./Fighting.module.css";
import "@/styles/CommonStyles.css";
import { EnemyInterface } from "@/Types/EnemyTypes";
import { useJourneyContext } from "@/utils/useContexts";
import { generateRandomNumber } from "@/utils/Utils";

interface EnemyElementProps {
  index: number;
  enemy: EnemyInterface;
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  playerActionsPerTurn: number;
  setPlayerActionsPerTurn: Dispatch<SetStateAction<number>>;
  AddEnemyToMarkedList: (enemyToAdd: EnemyInterface) => void;
}

export interface FightingProps {
  startEnemies: EnemyInterface[];
  initialEventMessage?: string;
}

const FindValidEnemies = (enemies: EnemyInterface[]) => {
  const validEnemies = enemies.filter((enemy) => enemy.health > 0);
  return validEnemies;
};

const EnemyElement = ({
  enemy,
  playerActionsPerTurn,
  setPlayerActionsPerTurn,
  AddEnemyToMarkedList,
}: EnemyElementProps) => {
  const { player } = useContext(GameMasterContext);
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

const Fight = ({ startEnemies, initialEventMessage }: FightingProps) => {
  const [turn, setTurn] = useState<number>(1);
  const [playerActionsPerTurn, setPlayerActionsPerTurn] = useState<number>(0);
  const [events, setEvents] = useState<string[]>(
    initialEventMessage ? [initialEventMessage] : ["The fight has started."]
  );
  const [isFightOver, setIsFightOver] = useState<boolean>(false);
  const [markedEnemies, setMarkedEnemies] = useState<EnemyInterface[]>([]);

  const [enemies, setEnemies] = useState<EnemyInterface[]>(startEnemies);

  const { player, setPlayer, setPlayerHealth, setPlayerHealthItems } =
    useContext(GameMasterContext);

  const { handleChangeEvent } = useJourneyContext();

  const QueueEvent = (event: string) => {
    setEvents((prev) => [...prev, event]);
  };

  const EnemyTurn = () => {
    FindValidEnemies(enemies).forEach((enemy) => {
      const inflictedDamage = generateRandomNumber(enemy.maxDamage, 0);

      //BECAUSE OF STATE UPDATE QUEUEING I NEED TO USE SETPLAYER DIRECTLY, DOES NOT WORK WITH SETPLAYERHEALTH
      setPlayer((prev) => ({
        ...prev,
        health: prev.health - inflictedDamage,
      }));

      if (inflictedDamage > 0) {
        QueueEvent(
          `Player was hit by ${enemy.name} for ${inflictedDamage} damage.`
        );
      } else {
        QueueEvent(`${enemy.name} missed.`);
      }
    });
  };

  const PlayerTurn = () => {
    const updatedEnemies = [...enemies];

    markedEnemies.forEach((markedEnemy) => {
      const enemyIndex = updatedEnemies.findIndex(
        (enemy) => enemy.name === markedEnemy.name
      );
      if (enemyIndex === -1) {
        throw new Error(
          `Enemy ${markedEnemy.name} not found in current fight enemies.`
        );
      }

      const inflictedDamage = generateRandomNumber(
        player.weapon.maxDamage,
        player.weapon.minDamage
      );

      updatedEnemies[enemyIndex].health -= inflictedDamage;

      QueueEvent(
        `${markedEnemy.name} was hit by the Player for ${inflictedDamage} damage.`
      );
    });

    setEnemies(updatedEnemies);

    setMarkedEnemies([]);
    setPlayerActionsPerTurn(0);
    if (FindValidEnemies(enemies).length === 0) {
      setIsFightOver(true);
    } else {
      EnemyTurn();
    }
  };

  const AddEnemyToMarkedList = (enemyToAdd: EnemyInterface) => {
    setMarkedEnemies((prev) => [...prev, enemyToAdd]);
  };

  const EndFight = () => {
    handleChangeEvent();
  };

  //MAKE HEALING PART A PLAYER ACTION INSTEAD OF AN INDEPENDENT EVENT

  const HealPlayer = () => {
    if (player.health >= 100) {
      QueueEvent("Your health is already at maximum.");
    } else if (player.healthItems <= 0) {
      QueueEvent("You do not have any items to heal with.");
    } else {
      if (player.health > 90) {
        const amountToHeal = 100 - player.health;
        setPlayerHealth(100);
        QueueEvent(`Player was healed for ${amountToHeal} health points.`);
      } else {
        setPlayerHealth(player.health + 10);
        QueueEvent("Player was healed for 10 health points.");
      }

      setPlayerHealthItems(player.healthItems - 1);
    }
  };

  return (
    <div className={styles.fightElement}>
      {!isFightOver ? (
        <div className={`UI-element`}>
          {enemies.map((enemy, i) => {
            return (
              <EnemyElement
                key={i}
                index={i}
                enemy={enemy}
                turn={turn}
                setTurn={setTurn}
                playerActionsPerTurn={playerActionsPerTurn}
                setPlayerActionsPerTurn={setPlayerActionsPerTurn}
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
        <button onClick={HealPlayer}>Heal</button>
        <button onClick={PlayerTurn}>End Turn</button>
      </div>
    </div>
  );
};

export default Fight;
