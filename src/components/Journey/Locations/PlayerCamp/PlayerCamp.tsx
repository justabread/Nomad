import { JourneyLocationElements } from "@/components/Locations";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";

import { useContext } from "react";

const PlayerCamp = () => {
  const { player, setPlayerHealth, setPlayerFoodItems, setPlayerLocation } =
    useContext(GameMasterContext);

  const HP_LOSS_NO_FOOD = 25;
  const HP_LOSS_SOME_FOOD = 10;
  const FOOD_LOSS = 2;

  return (
    <div className="UI-element">
      <h1>You have set up camp for the night.</h1>
      {(() => {
        if (player.foodItems <= 0) {
          return (
            <p>
              You do not have enough food to put anything on the campfire. As so
              many times before, you are going to starve tonight. (-
              {HP_LOSS_NO_FOOD} HP)
            </p>
          );
        } else if (player.foodItems === 1) {
          return (
            <p>
              You managed to scrape together enough food that you will at least
              be able to sleep. &quot;Tomorrow will be better&quot; - You tell
              yourself. (-{HP_LOSS_SOME_FOOD} HP)
            </p>
          );
        } else {
          return (
            <p>
              You cook some food on your campfire (-{FOOD_LOSS} Food). The food
              warms you up and eases your weary mind (Health Fully Restored).
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
                setPlayerHealth(player.health - HP_LOSS_NO_FOOD);
              } else if (player.foodItems <= 2) {
                setPlayerHealth(player.health - HP_LOSS_SOME_FOOD);
              } else {
                setPlayerHealth(100);
              }

              setPlayerFoodItems(player.foodItems - FOOD_LOSS);
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
