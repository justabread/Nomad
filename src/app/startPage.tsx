import Forest from "@/components/Journey/Environments/Forest/Forest";
import Preparation from "@/components/Preparation/Preparation";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { useContext } from "react";

const StartPage = () => {
  const { player, canRender } = useContext(GameMasterContext);
  return (
    <div>
      <p>Health:{player.health}</p>
      <p>Equipped Weapon:{player.weapon}</p>
      <p>Mind Trait:{player.mindTrait}</p>
      <p>Body Trait:{player.bodyTrait}</p>
      {canRender.preparation && <Preparation />}
      {canRender.forest && <Forest />}
    </div>
  );
};

export default StartPage;
