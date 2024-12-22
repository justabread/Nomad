import { useState } from "react";
import { JSX } from "react";
import useGenerateRandomElement from "../useGenerateRandomElement";
import useGenerateRandomNumber from "../useGenerateRandomNumber";
import { EnemyInterface } from "@/components/Player";
import { LocationNamesEnum } from "@/Types/LocationTypes";
import { RuinsEventsEnum } from "@/Types/EventTypes";

const Ruins = ({
  InitiateFight,
}: {
  InitiateFight: (fight: {
    location: LocationNamesEnum;
    enemies: EnemyInterface[];
  }) => void;
}) => {
  const enum buildingConditionEnum {
    HALF_RUINED,
    FULLY_RUINED,
    BURNED_OUT,
  }

  const buildingConditions = {
    [buildingConditionEnum.HALF_RUINED]: (
      <p>
        The building is half-ruined, with some parts still holding up pretty
        well.
      </p>
    ),
    [buildingConditionEnum.FULLY_RUINED]: (
      <p>The building is broken down and ruined.</p>
    ),
    [buildingConditionEnum.BURNED_OUT]: (
      <p>
        The building seems to have burned down a long time ago. Schorched walls
        and marks of black soot are the only signs of its past.
      </p>
    ),
  };

  const EventCalm = () => {
    const enum calmEventsEnum {
      PAST,
      SUN,
      BREEZE,
      PIGEONS,
    }

    const possibleCalmEvents: Record<calmEventsEnum, JSX.Element> = {
      [calmEventsEnum.PAST]: (
        <p>
          You think about what could have happened here, but the dead silence of
          it's past inhabitants deliver no answers.
        </p>
      ),
      [calmEventsEnum.SUN]: (
        <p>
          The sun shines brightly onto you, warming your face. For a moment, you
          forget about everything that has happened to you and just enjoy it.
        </p>
      ),
      [calmEventsEnum.BREEZE]: (
        <p>
          A gentle breeze rustles through the ruins, carrying the scent of
          decay.
        </p>
      ),
      [calmEventsEnum.PIGEONS]: (
        <p>
          A group of pigeons coo on top of a nearby building. You smile,
          thinking how unsurprising it is that they are still around.
        </p>
      ),
    };

    const randomCalmEvent = useGenerateRandomElement(possibleCalmEvents);

    return (
      <div>
        <p>
          A strange calmness surrounds you. You feel safe, for the time being.
        </p>
        {randomCalmEvent[1]}
        <button onClick={handleChangeEvent}>Continue</button>
      </div>
    );
  };

  const EventBandits = () => {
    const randomBanditsNumber = useGenerateRandomNumber(3, 5);

    let enemies: EnemyInterface[] = [];

    for (let i = 0; i < randomBanditsNumber; i++) {
      const enemy: EnemyInterface = {
        health: 50,
        maxDamageDealt: 10,
        name: `RandomEnemy ${i}`,
      };
      enemies.push(enemy);
    }

    const fight = {
      location: LocationNamesEnum.LOCATION_RUINS,
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
    const randomBuildingCondition =
      useGenerateRandomElement(buildingConditions)[1];

    return (
      <div>
        <h2>You enter what looks to have been some kind of a mall.</h2>
        {randomBuildingCondition}
        <p>You can look around, you will maybe find something useful.</p>
        <button onClick={handleChangeEvent}>Look Around</button>
        <button onClick={handleChangeEvent}>Leave</button>
      </div>
    );
  };

  const EventStoreGuns = () => {
    const randomBuildingCondition =
      useGenerateRandomElement(buildingConditions)[1];

    return (
      <div>
        <h2>You enter a gunstore.</h2>
        {randomBuildingCondition}
        <p>
          The clerk is nowhere to be found and the inside is a mess. "Lousy
          service." - You snicker to yourself.
        </p>
        <button onClick={handleChangeEvent}>Look Around</button>
      </div>
    );
  };

  const EventRestaurant = () => {
    const randomBuildingCondition =
      useGenerateRandomElement(buildingConditions)[1];

    return (
      <div>
        <h2>
          You enter what clearly used to be a restaurant. Plates, cups and
          utensils are all over the floor and tables.
        </h2>
        {randomBuildingCondition}
        <p>You find food.</p>
        <button onClick={handleChangeEvent}>Buy</button>
      </div>
    );
  };

  const EventStorePharmacy = () => {
    const randomBuildingCondition =
      useGenerateRandomElement(buildingConditions)[1];

    return (
      <div>
        <h2>You enter what looks to have been a pharmacy.</h2>
        {randomBuildingCondition}
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
    const possibleDogNeeds: Record<DogNeeds, JSX.Element> = {
      [DogNeeds.FOOD]: <p>They seem hungry, but not aggressive.</p>,
      [DogNeeds.PETS]: (
        <p>
          One of them walks up to you slowly and you pet them. They seem
          friendly now.
        </p>
      ),
      [DogNeeds.ANGRY]: <p>They are aggressive.</p>,
    };

    const randomDogNeed = useGenerateRandomElement(possibleDogNeeds);

    return (
      <div>
        <h2>You encounter a pack of {dogsNumber} dogs.</h2>
        {randomDogNeed[1]}
        {randomDogNeed[0] === DogNeeds.ANGRY ? (
          <button>Fight</button>
        ) : (
          <button onClick={handleChangeEvent}>Continue</button>
        )}
        <button>Run</button>
      </div>
    );
  };

  const RuinsEvents: Record<RuinsEventsEnum, () => JSX.Element> = {
    [RuinsEventsEnum.EVENT_CALM]: EventCalm,
    [RuinsEventsEnum.EVENT_BANDITS]: EventBandits,
    [RuinsEventsEnum.EVENT_MALL]: EventMall,
    [RuinsEventsEnum.EVENT_STORE_GUNS]: EventStoreGuns,
    [RuinsEventsEnum.EVENT_RESTAURANT]: EventRestaurant,
    [RuinsEventsEnum.EVENT_STORE_PHARMACY]: EventStorePharmacy,
    [RuinsEventsEnum.EVENT_DOGS]: EventDogs,
  };

  const [RandomEventComponent, setRandomEventComponent] = useState<
    () => JSX.Element
  >(() => useGenerateRandomElement(RuinsEvents)[1]);

  const handleChangeEvent = () => {
    setRandomEventComponent(() => useGenerateRandomElement(RuinsEvents)[1]);
  };
  return (
    <div className="UI-element">
      <h1>The ruins of an unknown city lay before you.</h1>
      <RandomEventComponent />
    </div>
  );
};

export default Ruins;
