import {
  generateRandomElement,
  GenerateRandomHealth,
  generateRandomNumber,
  useRunAway,
} from "@/utils/Utils";
import { RuinsEventsEnum } from "@/Types/EventTypes";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import { JourneyLocationsEnum } from "@/Types/LocationTypes";
import { DOG_CONSTANTS, EnemyInterface } from "@/Types/EnemyTypes";
import { BANDIT_CONSTANTS } from "@/Types/EnemyTypes";
import { GetItemPool } from "@/components/ItemPools";
import { useGameMasterContext, useJourneyContext } from "@/utils/useContexts";

const enum BuildingConditionEnum {
  HALF_RUINED,
  FULLY_RUINED,
  BURNED_OUT,
}

const buildingConditions: NameWithComponentInterface<BuildingConditionEnum>[] =
  [
    {
      name: BuildingConditionEnum.HALF_RUINED,
      component: () => (
        <p>
          The building is half-ruined, with some parts still holding up pretty
          well.
        </p>
      ),
    },
    {
      name: BuildingConditionEnum.FULLY_RUINED,
      component: () => <p>The building is broken down and ruined.</p>,
    },
    {
      name: BuildingConditionEnum.BURNED_OUT,
      component: () => (
        <p>
          The building seems to have burned down a long time ago. Schorched
          walls and marks of black soot are the only signs of its past.
        </p>
      ),
    },
  ];

const EventCalm = () => {
  const enum CalmEventsEnum {
    PAST,
    SUN,
    BREEZE,
    PIGEONS,
  }

  const possibleCalmEvents: NameWithComponentInterface<CalmEventsEnum>[] = [
    {
      name: CalmEventsEnum.PAST,
      component: () => (
        <p>
          You think about what could have happened here, but the dead silence of
          it&apos;s past inhabitants deliver no answers.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.SUN,
      component: () => (
        <p>
          The sun shines brightly onto you, warming your face. For a moment, you
          forget about everything that has happened to you and just enjoy it.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.BREEZE,
      component: () => (
        <p>
          A gentle breeze rustles through the ruins, carrying the scent of
          decay.
        </p>
      ),
    },
    {
      name: CalmEventsEnum.PIGEONS,
      component: () => (
        <p>
          A group of pigeons coo on top of a nearby building. You smile,
          thinking how unsurprising it is that they are still around.
        </p>
      ),
    },
  ];

  const RandomCalmEvent = generateRandomElement(possibleCalmEvents).component;

  const { handleChangeEvent } = useJourneyContext();

  return (
    <div>
      <p>
        A strange calmness surrounds you. You feel safe, for the time being.
      </p>
      <RandomCalmEvent />
      <button onClick={handleChangeEvent}>Continue</button>
    </div>
  );
};

const EventBandits = () => {
  const { InitiateFight, handleChangeEvent } = useJourneyContext();
  const { player, setPlayerFoodItems } = useGameMasterContext();
  const randomBanditsNumber = generateRandomNumber(5, 3);

  const enemies: EnemyInterface[] = Array.from(
    { length: randomBanditsNumber },
    (_, i) => ({
      name: `Bandit ${i}`,
      health: GenerateRandomHealth(BANDIT_CONSTANTS.MAX_HEALTH),
      maxDamage: BANDIT_CONSTANTS.MAX_DAMAGE,
    })
  );

  const RunAway = useRunAway();

  return (
    <div>
      <h2>
        A group of {randomBanditsNumber} men walk out of some broken buildings
        in front of you and stand in your way.
      </h2>
      <p>
        Their weapons are raised at you. You can either fight them, give them
        your food or run.
      </p>
      <button
        onClick={() =>
          InitiateFight({
            startEnemies: enemies,
          })
        }
      >
        Fight
      </button>
      <button
        onClick={() => {
          if (player.foodItems > 0) {
            setPlayerFoodItems(0);
            handleChangeEvent();
          } else {
            InitiateFight({
              startEnemies: enemies,
              initialEventMessage:
                "You failed to find anything edible in your backpack. The bandits did not take this well.",
            });
          }
        }}
      >
        Give them all your food
      </button>
      <button
        onClick={() => {
          RunAway(enemies, BANDIT_CONSTANTS.CHANCE_TO_RUN_FROM);
        }}
      >
        Run
      </button>
    </div>
  );
};

const EventMall = () => {
  const { InitiateLooting, handleChangeEvent } = useJourneyContext();
  const RandomBuildingCondition =
    generateRandomElement(buildingConditions).component;

  return (
    <div>
      <h2>You enter what looks to have been some kind of a mall.</h2>
      <RandomBuildingCondition />
      <p>You can look around, you will maybe find something useful.</p>
      <button
        onClick={() =>
          InitiateLooting({
            title:
              "You walk around the eerie, empty halls of the Mall. You search through storefronts and shops.",
            givenItemPool: GetItemPool(RuinsEventsEnum.EVENT_MALL),
            locationWhereLooting: JourneyLocationsEnum.LOCATION_RUINS,
          })
        }
      >
        Look Around
      </button>
      <button onClick={handleChangeEvent}>Leave</button>
    </div>
  );
};

const EventStoreGuns = () => {
  const { InitiateLooting, handleChangeEvent } = useJourneyContext();
  const RandomBuildingCondition =
    generateRandomElement(buildingConditions).component;

  return (
    <div>
      <h2>You enter a gunstore.</h2>
      <RandomBuildingCondition />
      <p>
        The clerk is nowhere to be found and the inside is a mess. &quot;Lousy
        service.&quot; - You snicker to yourself.
      </p>
      <button
        onClick={() => {
          InitiateLooting({
            title:
              "You search through the gunstore, looking for anything you might be able to use.",
            givenItemPool: GetItemPool(RuinsEventsEnum.EVENT_STORE_GUNS),
            locationWhereLooting: JourneyLocationsEnum.LOCATION_RUINS,
          });
        }}
      >
        Look Around
      </button>
      <button onClick={handleChangeEvent}>Leave</button>
    </div>
  );
};

const EventRestaurant = () => {
  const RandomBuildingCondition =
    generateRandomElement(buildingConditions).component;
  const { InitiateLooting, handleChangeEvent } = useJourneyContext();

  return (
    <div>
      <h2>
        You enter what clearly used to be a restaurant. Plates, cups and
        utensils are all over the floor and tables.
      </h2>
      <RandomBuildingCondition />
      <button
        onClick={() =>
          InitiateLooting({
            title:
              "You start picking through the rubble inside the old restaurant.",
            givenItemPool: GetItemPool(RuinsEventsEnum.EVENT_RESTAURANT),
            locationWhereLooting: JourneyLocationsEnum.LOCATION_RUINS,
          })
        }
      >
        Look Around
      </button>
      <button onClick={handleChangeEvent}>Leave</button>
    </div>
  );
};

const EventStorePharmacy = () => {
  const RandomBuildingCondition =
    generateRandomElement(buildingConditions).component;
  const { InitiateLooting, handleChangeEvent } = useJourneyContext();

  return (
    <div>
      <h2>You enter what looks to have been a pharmacy.</h2>
      <RandomBuildingCondition />
      <p>You can look around for medical supplies or leave.</p>
      <button
        onClick={() => {
          InitiateLooting({
            title:
              "You rip through every box that you can find in the pharmacy.",
            givenItemPool: GetItemPool(RuinsEventsEnum.EVENT_STORE_PHARMACY),
            locationWhereLooting: JourneyLocationsEnum.LOCATION_RUINS,
          });
        }}
      >
        Look around
      </button>
      <button onClick={handleChangeEvent}>Leave</button>
    </div>
  );
};

const EventDogs = () => {
  const { player, setPlayerFoodItems } = useGameMasterContext();
  const { handleChangeEvent, InitiateFight } = useJourneyContext();

  const enum DogNeeds {
    HUNGRY,
    PETS,
    ANGRY,
  }

  const randomDogsNumber = generateRandomNumber(3, 5);

  const RunAway = useRunAway();

  const enemies: EnemyInterface[] = Array.from(
    { length: randomDogsNumber },
    (_, i) => ({
      name: `Dog ${i}`,
      health: GenerateRandomHealth(DOG_CONSTANTS.MAX_HEALTH),
      maxDamage: DOG_CONSTANTS.MAX_DAMAGE,
    })
  );

  const possibleDogNeeds: NameWithComponentInterface<DogNeeds>[] = [
    {
      name: DogNeeds.HUNGRY,
      component: () => {
        const FOOD_LOSS = 2;
        return (
          <>
            <p>
              The are about to attack but you might be able to calm them down
              with some of your food.
            </p>
            <div>
              <button
                onClick={() => {
                  if (player.foodItems > 0) {
                    setPlayerFoodItems(player.foodItems - FOOD_LOSS);
                    handleChangeEvent();
                  } else {
                    InitiateFight({
                      startEnemies: enemies,
                      initialEventMessage:
                        "You failed to find anything edible in your backpack. The dogs did not take this well.",
                    });
                  }
                }}
              >
                Give them food
              </button>
              <button
                onClick={() => {
                  RunAway(enemies, DOG_CONSTANTS.CHANCE_TO_RUN_FROM);
                }}
              >
                Run
              </button>
            </div>
          </>
        );
      },
    },
    {
      name: DogNeeds.PETS,
      component: () => (
        <>
          <p>
            One of them walks up to you slowly and you pet them. They seem
            friendly now.
          </p>
          <div>
            <button
              onClick={() => {
                handleChangeEvent();
              }}
            >
              Continue
            </button>
          </div>
        </>
      ),
    },
    {
      name: DogNeeds.ANGRY,
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
                RunAway(enemies, DOG_CONSTANTS.CHANCE_TO_RUN_FROM);
              }}
            >
              Run
            </button>
          </div>
        </>
      ),
    },
  ];

  const RandomDogNeed = generateRandomElement(possibleDogNeeds);

  return (
    <div>
      <h2>You encounter a pack of {randomDogsNumber} dogs.</h2>
      <RandomDogNeed.component />
    </div>
  );
};

export const RuinsEvents: NameWithComponentInterface<RuinsEventsEnum>[] = [
  {
    name: RuinsEventsEnum.EVENT_CALM,
    component: EventCalm,
  },
  {
    name: RuinsEventsEnum.EVENT_BANDITS,
    component: EventBandits,
  },
  {
    name: RuinsEventsEnum.EVENT_MALL,
    component: EventMall,
  },
  {
    name: RuinsEventsEnum.EVENT_STORE_GUNS,
    component: EventStoreGuns,
  },
  {
    name: RuinsEventsEnum.EVENT_RESTAURANT,
    component: EventRestaurant,
  },
  {
    name: RuinsEventsEnum.EVENT_STORE_PHARMACY,
    component: EventStorePharmacy,
  },
  {
    name: RuinsEventsEnum.EVENT_DOGS,
    component: EventDogs,
  },
];
