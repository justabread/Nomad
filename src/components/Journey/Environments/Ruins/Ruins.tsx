import { RuinsEventKeys } from "@/Types/EventTypes";
import { useState } from "react";
import { JSX } from "react";
import useGenerateRandomElement from "../useGenerateRandomElement";
import useGenerateRandomNumber from "../useGenerateRandomNumber";

const Ruins = () => {
  const enum buildingConditionEnum {
    HALF_RUINED,
    FULLY_RUINED,
    BURNED_OUT,
  }

  const possibleBuildingConditions = {
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
    return (
      <div>
        <p>
          A strange calmness surrounds you. You feel safe, for the time being.
        </p>
        <p>
          You think about what could have happened here, but the dead silence of
          it's past inhabitants deliver no answers.
        </p>
        <button onClick={handleChangeEvent}>Continue</button>
      </div>
    );
  };

  const EventBandits = () => {
    return (
      <div>
        <h1>
          A group of men walk out of some broken buildings in front of you and
          stand in your way.
        </h1>
        <p>
          Their weapons, crude as they are, are still enough to make your heart
          start racing especially when pointed at you. They do not seem
          friendly.
        </p>
        <button onClick={handleChangeEvent}>Fight</button>
        <button>Run</button>
      </div>
    );
  };

  const EventMall = () => {
    return (
      <div>
        <h1>You enter a mall.</h1>
        <p>You find a store with guns.</p>
        <button onClick={handleChangeEvent}>Enter</button>
      </div>
    );
  };

  const EventStoreGuns = () => {
    return (
      <div>
        <h1>You enter a store with guns.</h1>
        <p>You find a gun.</p>
        <button onClick={handleChangeEvent}>Buy</button>
      </div>
    );
  };

  const EventStoreFood = () => {
    return (
      <div>
        <h1>You enter a store with food.</h1>
        <p>You find food.</p>
        <button onClick={handleChangeEvent}>Buy</button>
      </div>
    );
  };

  const EventStoreClothing = () => {
    return (
      <div>
        <h1>You enter a store with clothing.</h1>
        <p>You find clothing.</p>
        <button onClick={handleChangeEvent}>Buy</button>
      </div>
    );
  };

  const EventStorePharmacy = () => {
    const randomBuildingCondition = useGenerateRandomElement(
      possibleBuildingConditions
    )[1];

    return (
      <div>
        <h1>You enter what looks to have been a pharmacy.</h1>
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
        <h1>You encounter a pack of {dogsNumber} dogs.</h1>
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

  const RuinsEvents: Record<RuinsEventKeys, () => JSX.Element> = {
    [RuinsEventKeys.EVENT_CALM]: EventCalm,
    [RuinsEventKeys.EVENT_BANDITS]: EventBandits,
    [RuinsEventKeys.EVENT_MALL]: EventMall,
    [RuinsEventKeys.EVENT_STORE_GUNS]: EventStoreGuns,
    [RuinsEventKeys.EVENT_STORE_FOOD]: EventStoreFood,
    [RuinsEventKeys.EVENT_STORE_CLOTHING]: EventStoreClothing,
    [RuinsEventKeys.EVENT_STORE_PHARMACY]: EventStorePharmacy,
    [RuinsEventKeys.EVENT_DOGS]: EventDogs,
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
