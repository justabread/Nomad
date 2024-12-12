import { JSX, useContext, useState } from "react";
import useGenerateRandomEvent from "../useGenerateRandomEvent";
import { ForestEventKeys } from "@/Types/EventTypes";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";

const Forest = () => {
  const { player } = useContext(GameMasterContext);

  const EventCalm = () => {
    return (
      <div>
        <h1>You are walking through a forest.</h1>
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

  const ForestEvents = {
    [ForestEventKeys.EVENT_CALM]: EventCalm,
    [ForestEventKeys.EVENT_WOLF]: EventWolf,
  };

  const [RandomEventComponent, setRandomEventComponent] = useState<
    () => JSX.Element
  >(() => useGenerateRandomEvent(ForestEvents));

  const handleChangeEvent = () => {
    setRandomEventComponent(() => useGenerateRandomEvent(ForestEvents));
  };

  return (
    <div>
      <RandomEventComponent />
    </div>
  );
};

export default Forest;
