import {
  BANDIT_CONSTANTS,
  BEAR_CONSTANTS,
  COTTAGE_INHABITANT_CONSTANTS,
  EnemyInterface,
  generateEnemies,
  WOLF_CONSTANTS,
} from "@/Types/EnemyTypes";
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
  const { player, setPlayerHealth, setPlayerFoodItems } =
    useGameMasterContext();
  const { handleChangeEvent, InitiateFight } = useJourneyContext();
  const RunAway = useRunAway();

  const enum CaveEventsEnum {
    INHABITED,
    EMPTY,
  }

  const enum CaveInhabitantsEnum {
    BANDITS,
    BEAR,
    WOLVES,
  }

  const caveInhabitants = [
    {
      id: CaveInhabitantsEnum.BANDITS,
      name: "Bandits",
      enemies: generateEnemies({
        name: "Bandit",
        min: 2,
        max: 5,
        enemyConstants: BANDIT_CONSTANTS,
      }),
    },
    {
      id: CaveInhabitantsEnum.BEAR,
      name: "Bear",
      enemies: generateEnemies({
        name: "Bear",
        enemyConstants: BEAR_CONSTANTS,
      }),
    },
    {
      id: CaveInhabitantsEnum.WOLVES,
      name: "Wolves",
      enemies: generateEnemies({
        name: "Wolf",
        min: 2,
        max: 5,
        enemyConstants: WOLF_CONSTANTS,
      }),
    },
  ];

  const possibleCaveEvents: NameWithComponentInterface<CaveEventsEnum>[] = [
    {
      name: CaveEventsEnum.INHABITED,
      component: () => {
        const caveInhabitant = generateRandomElement(caveInhabitants);
        switch (caveInhabitant.id) {
          case CaveInhabitantsEnum.BANDITS:
            return (
              <>
                <p>
                  As you enter you find yourself staring down a group of
                  confused and armed people. For a second, you consider taking a
                  step back, but by that time it is too late. You ready yourself
                  for a fight.
                </p>
                <button
                  onClick={() => {
                    InitiateFight({
                      startEnemies: caveInhabitant.enemies,
                    });
                  }}
                >
                  Fight
                </button>
                <button
                  onClick={() => {
                    RunAway(
                      caveInhabitant.enemies,
                      WOLF_CONSTANTS.CHANCE_TO_RUN_FROM
                    );
                  }}
                >
                  Run
                </button>
              </>
            );
          case CaveInhabitantsEnum.BEAR:
            return (
              <>
                <p>
                  The cave is dark, and damp. You stumble around, trying to feel
                  the walls of the cave, when suddenly, your hand encounters
                  something soft. By the time you realize it is fur, a deep
                  growl and two deadly paws make it clear how much of a mistake
                  you just made.
                </p>
                <button
                  onClick={() => {
                    InitiateFight({
                      startEnemies: caveInhabitant.enemies,
                    });
                  }}
                >
                  Fight
                </button>
                <button
                  onClick={() => {
                    RunAway(
                      caveInhabitant.enemies,
                      WOLF_CONSTANTS.CHANCE_TO_RUN_FROM
                    );
                  }}
                >
                  Run
                </button>
              </>
            );
          case CaveInhabitantsEnum.WOLVES:
            return (
              <>
                <p>
                  Before you even try to step foot inside, a group of wolves
                  slowly approach, sending you the message that you won&apos;t
                  be able to explore their home without a fight.
                </p>
                <button
                  onClick={() => {
                    InitiateFight({
                      startEnemies: caveInhabitant.enemies,
                    });
                  }}
                >
                  Fight
                </button>
                <button
                  onClick={() => {
                    RunAway(
                      caveInhabitant.enemies,
                      WOLF_CONSTANTS.CHANCE_TO_RUN_FROM
                    );
                  }}
                >
                  Run
                </button>
              </>
            );
          default:
            return (
              <>
                <p>
                  If you see this text, that means I created a cave inhabitant
                  with a wrong id.
                </p>
              </>
            );
        }
      },
    },
    {
      name: CaveEventsEnum.EMPTY,
      component: () => {
        const HP_GAIN = 10;
        const FOOD_GAIN = 2;
        return (
          <>
            <p>
              The cave is cold, dark and thankfully, empty. You forage around
              for a while, make a fire and rest a bit, enjoying the safety,
              solitude and warmth your fire provides. (+{HP_GAIN} HP, +
              {FOOD_GAIN} Food)
            </p>
            <button
              onClick={() => {
                setPlayerHealth(player.health + HP_GAIN);
                setPlayerFoodItems(player.foodItems + FOOD_GAIN);
                handleChangeEvent();
              }}
            >
              Continue
            </button>
          </>
        );
      },
    },
  ];

  const RandomCaveEvent = generateRandomElement(possibleCaveEvents).component;

  return (
    <div>
      <h2>You stumble upon a dark cave.</h2>
      <RandomCaveEvent />
    </div>
  );
};

const EventCottage = () => {
  const { player, setPlayerHealth, setPlayerFoodItems } =
    useGameMasterContext();
  const { handleChangeEvent, InitiateFight } = useJourneyContext();
  const RunAway = useRunAway();

  const enum CottageEventsEnum {
    INHABITANT_CALM,
    INHABITANT_HOSTILE,
    WOLF_CALM,
    WOLF_HOSTILE,
    EMPTY,
  }

  let enemies: EnemyInterface[] = [];

  const possibleCottageEvents: NameWithComponentInterface<CottageEventsEnum>[] =
    [
      {
        name: CottageEventsEnum.INHABITANT_CALM,
        component: () => {
          const HP_GAIN = 10;
          const FOOD_GAIN = 2;
          return (
            <>
              <p>
                As you enter, you realize it is not abandoned. Inside, a person
                sits in front of a lit fireplace, drinking from a stained metal
                mug. He looks at you, motions towards a chair next to him and
                turns back towards the fire. You decide to sit with him and rest
                your body. (+{HP_GAIN} HP, +{FOOD_GAIN} Food) After some time,
                you stand up, wish him luck and return to your journey.
              </p>
              <button
                onClick={() => {
                  setPlayerHealth(player.health + HP_GAIN);
                  setPlayerFoodItems(player.foodItems + FOOD_GAIN);
                  handleChangeEvent();
                }}
              >
                Continue
              </button>
            </>
          );
        },
      },
      {
        name: CottageEventsEnum.INHABITANT_HOSTILE,
        component: () => {
          enemies = [
            {
              name: "Angry Cottage Inhabitant",
              health: GenerateRandomHealth(
                COTTAGE_INHABITANT_CONSTANTS.MAX_HEALTH
              ),
              maxDamage: COTTAGE_INHABITANT_CONSTANTS.MAX_DAMAGE,
            },
          ];
          return (
            <>
              <p>
                As you enter, a gunshot rings out from inside and a bullet
                wedges itself into the wall just inches from your head. You are
                about to fight for this cottage.
              </p>
              <button
                onClick={() => {
                  InitiateFight({ startEnemies: enemies });
                }}
              >
                Fight
              </button>
              <button
                onClick={() => {
                  RunAway(
                    enemies,
                    COTTAGE_INHABITANT_CONSTANTS.CHANCE_TO_RUN_FROM
                  );
                }}
              >
                Run
              </button>
            </>
          );
        },
      },
      {
        name: CottageEventsEnum.WOLF_CALM,
        component: () => {
          const HP_GAIN = 10;
          const FOOD_GAIN = 2;
          return (
            <>
              <p>
                You enter the building and see a wounded wolf laying on the
                floor inside. It notices you, tries to stand up but falls back
                onto the floor. You notice, that one of it&apos;s paw is
                wounded. You sit down onto the floor a good distance from it,
                signaling that you dont&apos;t want any trouble, just rest. The
                two of you share the time in silence, and after a while, you
                stand up, nod to the wolf and continue on your way. (+{HP_GAIN}{" "}
                HP, +{FOOD_GAIN} Food)
              </p>
              <button
                onClick={() => {
                  setPlayerHealth(player.health + HP_GAIN);
                  setPlayerFoodItems(player.foodItems + FOOD_GAIN);
                  handleChangeEvent();
                }}
              >
                Continue
              </button>
            </>
          );
        },
      },
      {
        name: CottageEventsEnum.WOLF_HOSTILE,
        component: () => {
          enemies = [
            {
              name: "Cottage Wolf",
              health: GenerateRandomHealth(WOLF_CONSTANTS.MAX_HEALTH),
              maxDamage: WOLF_CONSTANTS.MAX_DAMAGE,
            },
          ];
          return (
            <>
              <p>
                You step through the door, without noticing the warning growls
                eminating from inside. Before you know it, you are face to face
                with the current claimant of the shelter. You are about to fight
                with them for it.
              </p>
              <button
                onClick={() => {
                  InitiateFight({ startEnemies: enemies });
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
            </>
          );
        },
      },
      {
        name: CottageEventsEnum.EMPTY,
        component: () => {
          const FOOD_GAIN = 2;
          return (
            <>
              <p>
                The building is empty, long abandoned by it&apos;s previous
                inhabitants. Fortunately, there are still enough supplies to
                make a fire and rest here for a bit, although the loneliness, as
                usual, does not make for good company. (+{FOOD_GAIN} Food)
              </p>
              <button
                onClick={() => {
                  setPlayerFoodItems(player.foodItems + FOOD_GAIN);
                  handleChangeEvent();
                }}
              >
                Continue
              </button>
            </>
          );
        },
      },
    ];
  const RandomCottageEvent = generateRandomElement(
    possibleCottageEvents
  ).component;
  return (
    <div>
      <h2>You stumble upon a cottage.</h2>
      <RandomCottageEvent />
    </div>
  );
};

const EventLake = () => {
  const { player, setPlayerFoodItems } = useGameMasterContext();
  const { handleChangeEvent } = useJourneyContext();
  const FOOD_GAIN = generateRandomNumber(6, 0);
  return (
    <div>
      <h2>You stumble upon a lake.</h2>
      <p>
        The weather is calm and you see some fishing supplies scattered around.
        You decide to stay here for a bit and fish.
      </p>
      <p>After some hours pass, you take a look at yout haul.</p>
      {FOOD_GAIN > 0 ? (
        <p>You caught {FOOD_GAIN} fish(es).</p>
      ) : (
        <p>You failed to catch any fish.</p>
      )}
      <button
        onClick={() => {
          setPlayerFoodItems(player.foodItems + FOOD_GAIN);
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

  const randomWolfNumber = generateRandomNumber(3, 5);

  const RunAway = useRunAway();

  const enemies: EnemyInterface[] = Array.from(
    { length: randomWolfNumber },
    (_, i) => ({
      name: `Wolf ${i}`,
      health: GenerateRandomHealth(WOLF_CONSTANTS.MAX_HEALTH),
      maxDamage: WOLF_CONSTANTS.MAX_DAMAGE,
    })
  );
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
                InitiateFight({
                  startEnemies: enemies,
                });
              }}
            >
              Fight
            </button>
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

  const RandomWolfNeed = generateRandomElement(possibleWolfNeeds);

  return (
    <div>
      <h2>You encounter a pack of {randomWolfNumber} wolves.</h2>
      <RandomWolfNeed.component />
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
