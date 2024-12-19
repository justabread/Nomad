import {
  GameMasterContext,
  GetLocationsWithoutUtilities,
} from "@/Contexts/GameMasterContextProvider";
import { LocationNamesEnum } from "@/Types/LocationTypes";
import { useContext } from "react";

const PlayerCamp = () => {
  const { player, setPlayer, setPlayerLocation } =
    useContext(GameMasterContext);

  return (
    <div className="UI-element">
      <h1>You have set up camp for the night.</h1>
      {player.food < 10 ? (
        <p>
          You do not have enough food to put anything on the campfire. As so
          many times before, you are going to starve tonight. (-25 HP)
        </p>
      ) : (
        <p>
          You cook some food on the campfire. The food warms you up and eases
          your weary mind.
        </p>
      )}
      You will head tomorrow towards:
      {GetLocationsWithoutUtilities().map(([key, value]) => {
        return (
          <button
            onClick={() => {
              setPlayer((prev) => ({ ...prev, health: prev.health - 25 }));
              setPlayerLocation(key as LocationNamesEnum);
            }}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default PlayerCamp;
