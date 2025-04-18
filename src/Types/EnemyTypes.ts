import { GenerateRandomHealth, generateRandomNumber } from "@/utils/Utils";

export interface EnemyInterface {
  name: string;
  health: number;
  maxDamage: number;
}

interface EnemyConstants {
  MAX_HEALTH: number;
  MAX_DAMAGE: number;
  CHANCE_TO_RUN_FROM: number;
}

export const generateEnemies = ({
  name,
  min = 1,
  max = 1,
  enemyConstants,
}: {
  name: string;
  min?: number;
  max?: number;
  enemyConstants: EnemyConstants;
}) => {
  const randomEnemyNumber = generateRandomNumber(min, max);
  const enemies = Array.from({ length: randomEnemyNumber }, (_, i) => ({
    name: `${name} ${i}`,
    health: GenerateRandomHealth(enemyConstants.MAX_HEALTH),
    maxDamage: enemyConstants.MAX_DAMAGE,
  }));

  return enemies;
};

export const BANDIT_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 50,
  MAX_DAMAGE: 20,
  CHANCE_TO_RUN_FROM: 30,
};

export const DOG_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 20,
  MAX_DAMAGE: 10,
  CHANCE_TO_RUN_FROM: 70,
};

export const WOLF_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 30,
  MAX_DAMAGE: 15,
  CHANCE_TO_RUN_FROM: 60,
};

export const BEAR_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 60,
  MAX_DAMAGE: 40,
  CHANCE_TO_RUN_FROM: 30,
};

export const COTTAGE_INHABITANT_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 150,
  MAX_DAMAGE: 30,
  CHANCE_TO_RUN_FROM: 50,
};
