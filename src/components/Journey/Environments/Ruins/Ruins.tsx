import { useContext, useEffect, useState } from "react";
import { JSX } from "react";
import {
  useGenerateRandomElement,
  useGenerateRandomNumber,
} from "../useGenerateRandoms";

import { RuinsEventsEnum } from "@/Types/EventTypes";
import { NameWithComponentInterface } from "@/Types/GameTypes";
import { JourneyContext } from "@/Contexts/JourneyContextProvider";
import { JourneyLocationsEnum } from "@/Types/LocationTypes";
import { EnemyInterface } from "@/Types/EnemyTypes";
import { BANDIT_CONSTANTS } from "@/Types/EnemyTypes";

const Ruins = () => {
  const { InitiateFight } = useContext(JourneyContext);

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
            You think about what could have happened here, but the dead silence
            of it's past inhabitants deliver no answers.
          </p>
        ),
      },
      {
        name: CalmEventsEnum.SUN,
        component: () => (
          <p>
            The sun shines brightly onto you, warming your face. For a moment,
            you forget about everything that has happened to you and just enjoy
            it.
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

    const RandomCalmEvent =
      useGenerateRandomElement(possibleCalmEvents).component;

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
    const randomBanditsNumber = useGenerateRandomNumber(5, 3);

    let enemies: EnemyInterface[] = [];

    for (let i = 0; i < randomBanditsNumber; i++) {
      const enemy: EnemyInterface = {
        name: `RandomEnemy ${i}`,
        health:
          Math.round(
            useGenerateRandomNumber(BANDIT_CONSTANTS.MAX_BANDIT_HEALTH, 10) / 10
          ) * 10,
        maxDamage: 10,
      };
      enemies.push(enemy);
    }

    const fight = {
      location: JourneyLocationsEnum.LOCATION_RUINS,
      enemies: enemies,
    };

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
        <button onClick={() => InitiateFight(fight)}>Fight</button>
        <button onClick={handleChangeEvent}>Give them your food</button>
        <button>Run</button>
      </div>
    );
  };

  const EventMall = () => {
    const RandomBuildingCondition =
      useGenerateRandomElement(buildingConditions).component;

    return (
      <div>
        <h2>You enter what looks to have been some kind of a mall.</h2>
        <RandomBuildingCondition />
        <p>You can look around, you will maybe find something useful.</p>
        <button onClick={handleChangeEvent}>Look Around</button>
        <button onClick={handleChangeEvent}>Leave</button>
      </div>
    );
  };

  const EventStoreGuns = () => {
    const RandomBuildingCondition =
      useGenerateRandomElement(buildingConditions).component;

    return (
      <div>
        <h2>You enter a gunstore.</h2>
        <RandomBuildingCondition />
        <p>
          The clerk is nowhere to be found and the inside is a mess. "Lousy
          service." - You snicker to yourself.
        </p>
        <button onClick={handleChangeEvent}>Look Around</button>
      </div>
    );
  };

  const EventRestaurant = () => {
    const RandomBuildingCondition =
      useGenerateRandomElement(buildingConditions).component;

    return (
      <div>
        <h2>
          You enter what clearly used to be a restaurant. Plates, cups and
          utensils are all over the floor and tables.
        </h2>
        <RandomBuildingCondition />
        <p>You find food.</p>
        <button onClick={handleChangeEvent}>Buy</button>
      </div>
    );
  };

  const EventStorePharmacy = () => {
    const RandomBuildingCondition =
      useGenerateRandomElement(buildingConditions).component;

    return (
      <div>
        <h2>You enter what looks to have been a pharmacy.</h2>
        <RandomBuildingCondition />
        <p>You can look around for medical supplies or leave.</p>
        <button>Look around</button>
        <button onClick={handleChangeEvent}>Leave</button>
      </div>
    );
  };

  const EventDogs = () => {
    const enum DogNeeds {
      FOOD,
      PETS,
      ANGRY,
    }

    const dogsNumber = useGenerateRandomNumber(3, 5);

    const possibleDogNeeds: NameWithComponentInterface<DogNeeds>[] = [
      {
        name: DogNeeds.FOOD,
        component: () => <p>They seem hungry, but not aggressive.</p>,
      },
      {
        name: DogNeeds.PETS,
        component: () => (
          <p>
            One of them walks up to you slowly and you pet them. They seem
            friendly now.
          </p>
        ),
      },
      {
        name: DogNeeds.ANGRY,
        component: () => <p>They are aggressive.</p>,
      },
    ];

    const RandomDogNeed = useGenerateRandomElement(possibleDogNeeds);

    return (
      <div>
        <h2>You encounter a pack of {dogsNumber} dogs.</h2>
        <RandomDogNeed.component />
        {RandomDogNeed.name === DogNeeds.ANGRY ? (
          <button>Fight</button>
        ) : (
          <button onClick={handleChangeEvent}>Continue</button>
        )}
        <button>Run</button>
      </div>
    );
  };

  const RuinsEvents: NameWithComponentInterface<RuinsEventsEnum>[] = [
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

  const [RandomEventComponent, setRandomEventComponent] = useState<
    NameWithComponentInterface<RuinsEventsEnum>
  >(() => useGenerateRandomElement(RuinsEvents));

  const handleChangeEvent = () => {
    setRandomEventComponent(() =>
      useGenerateRandomElement(RuinsEvents, RandomEventComponent)
    );
  };
  return (
    <div className="UI-element">
      <h1>The ruins of an unknown city lay before you.</h1>
      <RandomEventComponent.component />
    </div>
  );
};

export default Ruins;
