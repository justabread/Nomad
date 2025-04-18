import { EnemyInterface } from "@/Types/EnemyTypes";
import { useJourneyContext } from "./useContexts";

export const Shuffle = <T>(array: Array<T>) => {
  let newArray = array;
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const generateRandomNumber = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomElement = <T>(
  elements: T[],
  previousElement?: T
) => {
  if (previousElement) {
    const elementsWithoutPreviousElement = elements.filter((element) => {
      return element !== previousElement;
    });

    return elementsWithoutPreviousElement[
      generateRandomNumber(elementsWithoutPreviousElement.length - 1)
    ];
  } else {
    return elements[generateRandomNumber(elements.length - 1)];
  }
};

export const useRunAway = () => {
  const { InitiateFight, handleChangeEvent } = useJourneyContext();

  const DidPlayerRunAwayFromEnemies = (chance: number): boolean => {
    const randomValue = generateRandomNumber(100, 1);
    return randomValue <= chance;
  };

  const RunAway = (enemies: EnemyInterface[], chance: number) => {
    if (!DidPlayerRunAwayFromEnemies(chance)) {
      InitiateFight({
        startEnemies: enemies,
      });
    } else {
      handleChangeEvent();
    }
  };

  return RunAway;
};

export const GenerateRandomHealth = (max_health: number): number => {
  return Math.round(generateRandomNumber(max_health, 10) / 10) * 10;
};
