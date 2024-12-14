import { RuinsEventKeys } from "@/Types/EventTypes";
import { useState } from "react";
import { JSX } from "react";
import useGenerateRandomEvent from "../useGenerateRandomEvent";

const Ruins = () => {
  const EventCalm = () => {
    return (
      <div>
        <h1>The ruins of an unknown city lay before you.</h1>
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

  const RuinsEvents = {
    [RuinsEventKeys.EVENT_CALM]: EventCalm,
    [RuinsEventKeys.EVENT_BANDITS]: EventBandits,
  };

  const [RandomEventComponent, setRandomEventComponent] = useState<
    () => JSX.Element
  >(() => useGenerateRandomEvent(RuinsEvents));

  const handleChangeEvent = () => {
    setRandomEventComponent(() => useGenerateRandomEvent(RuinsEvents));
  };
  return (
    <div>
      <RandomEventComponent />
    </div>
  );
};

export default Ruins;
