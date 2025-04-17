import { JourneyLocationElements } from "@/components/Locations";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";

import { useContext } from "react";

const PlayerCamp = () => {
  const { player, setPlayerHealth, setPlayerFoodItems, setPlayerLocation } =
    useContext(GameMasterContext);

  return (
    <div className="UI-element">
      <h1>You have set up camp for the night.</h1>
      {(() => {
        if (player.foodItems <= 0) {
          return (
            <p>
              You do not have enough food to put anything on the campfire. As so
              many times before, you are going to starve tonight. (-25 HP)
            </p>
          );
        } else if (player.foodItems === 1) {
          return (
            <p>
              You managed to scrape together enough food that you will at least
              be able to sleep. &quot;Tomorrow will be better&quot; - You tell
              yourself. (-10 HP)
            </p>
          );
        } else {
          return (
            <p>
              You cook some food on your campfire (-2 Food). The food warms you
              up and eases your weary mind.
            </p>
          );
        }
      })()}
      You will head tomorrow towards:
      {JourneyLocationElements().map((element, i) => {
        return (
          <button
            onClick={() => {
              if (player.foodItems <= 0) {
                setPlayerHealth(player.health - 25);
              } else if (player.foodItems <= 2) {
                setPlayerHealth(player.health - 10);
              }

              setPlayerFoodItems(player.foodItems - 2);
              setPlayerLocation(element.name);
            }}
            key={i}
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};

export default PlayerCamp;
