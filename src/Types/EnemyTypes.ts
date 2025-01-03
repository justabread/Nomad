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

export const BANDIT_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 50,
  MAX_DAMAGE: 20,
  CHANCE_TO_RUN_FROM: 60,
};

export const DOG_CONSTANTS: EnemyConstants = {
  MAX_HEALTH: 20,
  MAX_DAMAGE: 15,
  CHANCE_TO_RUN_FROM: 70,
};
