import { JSX, useContext, useState } from "react";
import { useGenerateRandomElement } from "../useGenerateRandoms";
import { ForestEventsEnum } from "@/Types/EventTypes";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { NameWithComponentInterface } from "@/Types/GameTypes";

const Forest = () => {
  const { player } = useContext(GameMasterContext);

  const EventCalm = () => {
    return (
      <div>
        <p>The weather is calm and the air is fresh.</p>
        <p>
          You hear some animals in the distance, but they seem to be far away.
        </p>
        <button onClick={handleChangeEvent}>Continue</button>
      </div>
    );
  };

  const EventWolf = () => {
    return (
      <div>
        <h1>You encounter a wolf.</h1>
        <p>Your health is at {player.health} %.</p>
        <p>Your weapon is a {player.weapon.name}.</p>
        <button onClick={handleChangeEvent}>Fight</button>
        <button>Run</button>
      </div>
    );
  };

  const ForestEvents: NameWithComponentInterface<ForestEventsEnum>[] = [
    { name: ForestEventsEnum.EVENT_CALM, component: EventCalm },
    { name: ForestEventsEnum.EVENT_WOLF, component: EventWolf },
  ];

  const [RandomEventComponent, setRandomEventComponent] = useState<
    (props: any) => JSX.Element
  >(() => useGenerateRandomElement(ForestEvents).component);

  const handleChangeEvent = () => {
    setRandomEventComponent(
      () => useGenerateRandomElement(ForestEvents).component
    );
  };

  return (
    <div className="UI-element">
      <h1>You are walking through a forest.</h1>
      <RandomEventComponent />
    </div>
  );
};

export default Forest;
