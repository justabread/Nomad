import { JSX, useContext, useState } from "react";
import useGenerateRandomElement from "../useGenerateRandomElement";
import { ForestEventKeys } from "@/Types/EventTypes";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";

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
        <p>Your weapon is a {player.weapon}.</p>
        <button onClick={handleChangeEvent}>Fight</button>
        <button>Run</button>
      </div>
    );
  };

  const ForestEvents: Record<ForestEventKeys, () => JSX.Element> = {
    [ForestEventKeys.EVENT_CALM]: EventCalm,
    [ForestEventKeys.EVENT_WOLF]: EventWolf,
  };

  const [RandomEventComponent, setRandomEventComponent] = useState<
    () => JSX.Element
  >(() => useGenerateRandomElement(ForestEvents)[1]);

  const handleChangeEvent = () => {
    setRandomEventComponent(() => useGenerateRandomElement(ForestEvents)[1]);
  };

  return (
    <div className="UI-element">
      <h1>You are walking through a forest.</h1>
      <RandomEventComponent />
    </div>
  );
};

export default Forest;
