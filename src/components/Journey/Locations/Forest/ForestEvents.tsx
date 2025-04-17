import { EnemyInterface, WOLF_CONSTANTS } from "@/Types/EnemyTypes";
import { ForestEventsEnum } from "@/Types/EventTypes";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import { useGameMasterContext, useJourneyContext } from "@/utils/useContexts";
import {
  generateRandomElement,
  GenerateRandomHealth,
  generateRandomNumber,
  useRunAway,
} from "@/utils/Utils";

const EventCalm = () => {
  const { handleChangeEvent } = useJourneyContext();

  const enum CalmEventsEnum {
    NOISE,
    SIT,
    DEER,
    CORPSE,
  }

  const possibleCalmEvents: NameWithComponentInterface<CalmEventsEnum>[] = [
    {
      name: CalmEventsEnum.NOISE,
      component: () => (
        <p>
          You hear a noise in the distance, far enough away that it causes no
          concern. You wonder what could have made it, but the noise stops and
          you decide not to give it much thought.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.SIT,
      component: () => (
        <p>
          You decide to sit down on a rock that looks comfortable. After a
          couple minutes of being lost in your thoughts, you decide to continue.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.DEER,
      component: () => (
        <p>
          A deer runs past some bushes in the distance. It stops for a second,
          looks up and you lock eyes with the animal. After a while it continues
          on, and you decide to do the same.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.CORPSE,
      component: () => (
        <p>
          You notice someone laying on the ground in an advanced state of
          decomposition. Animals picked through what was left of them already
          and a pack lays ripped open and empty next to it. You walk past and
          try not to think about it.
        </p>
      ),
    },
  ];

  const RandomCalmEvent = generateRandomElement(possibleCalmEvents).component;

  return (
    <div>
      <p>The weather is calm and the air is fresh.</p>
      <RandomCalmEvent />
      <button onClick={handleChangeEvent}>Continue</button>
    </div>
  );
};

const EventCave = () => {
  const { handleChangeEvent } = useJourneyContext();
  return (
    <div>
      <h2>You stumble upon a dark cave.</h2>
      <button
        onClick={() => {
          handleChangeEvent();
        }}
      >
        Continue
      </button>
    </div>
  );
};

const EventCottage = () => {
  const { handleChangeEvent } = useJourneyContext();
  return (
    <div>
      <h2>You stumble upon a cottage.</h2>
      <button
        onClick={() => {
          handleChangeEvent();
        }}
      >
        Continue
      </button>
    </div>
  );
};

const EventLake = () => {
  const { handleChangeEvent } = useJourneyContext();
  return (
    <div>
      <h2>You stumble upon a lake.</h2>
      <button
        onClick={() => {
          handleChangeEvent();
        }}
      >
        Continue
      </button>
    </div>
  );
};

const EventWolves = () => {
  const { player } = useGameMasterContext();
  const { handleChangeEvent, InitiateFight } = useJourneyContext();

  const enum WolfNeeds {
    HUNGRY,
    ANGRY,
  }
  const possibleWolfNeeds: NameWithComponentInterface<WolfNeeds>[] = [
    {
      name: WolfNeeds.HUNGRY,
      component: () => (
        <>
          <p>
            The are about to attack but you might be able to calm them down with
            some of your food.
          </p>
          <div>
            <button
              onClick={() => {
                if (player.foodItems > 0) {
                  handleChangeEvent();
                } else {
                  InitiateFight({
                    startEnemies: enemies,
                    initialEventMessage:
                      "You failed to find anything edible in your backpack. The wolves did not take this well.",
                  });
                }
              }}
            >
              Give them food
            </button>
            <button
              onClick={() => {
                RunAway(enemies, WOLF_CONSTANTS.CHANCE_TO_RUN_FROM);
              }}
            >
              Run
            </button>
          </div>
        </>
      ),
    },
    {
      name: WolfNeeds.ANGRY,
      component: () => (
        <>
          <p>They are aggressive.</p>
          <div>
            <button
              onClick={() => {
                InitiateFight({
                  startEnemies: enemies,
                });
              }}
            >
              Fight
            </button>
            <button
              onClick={() => {
                RunAway(enemies, WOLF_CONSTANTS.CHANCE_TO_RUN_FROM);
              }}
            >
              Run
            </button>
          </div>
        </>
      ),
    },
  ];

  const randomDogsNumber = generateRandomNumber(3, 5);

  const RandomDogNeed = generateRandomElement(possibleWolfNeeds);
  const RunAway = useRunAway();

  const enemies: EnemyInterface[] = Array.from(
    { length: randomDogsNumber },
    (_, i) => ({
      name: `Wolf ${i}`,
      health: GenerateRandomHealth(WOLF_CONSTANTS.MAX_HEALTH),
      maxDamage: WOLF_CONSTANTS.MAX_DAMAGE,
    })
  );

  return (
    <div>
      <h2>You encounter a pack of {randomDogsNumber} wolves.</h2>
      <RandomDogNeed.component />
    </div>
  );
};

export const ForestEvents: NameWithComponentInterface<ForestEventsEnum>[] = [
  {
    name: ForestEventsEnum.EVENT_CALM,
    component: EventCalm,
  },
  {
    name: ForestEventsEnum.EVENT_CAVE,
    component: EventCave,
  },
  {
    name: ForestEventsEnum.EVENT_COTTAGE,
    component: EventCottage,
  },
  {
    name: ForestEventsEnum.EVENT_LAKE,
    component: EventLake,
  },
  {
    name: ForestEventsEnum.EVENT_WOLVES,
    component: EventWolves,
  },
];
