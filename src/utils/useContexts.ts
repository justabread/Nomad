import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { JourneyContext } from "@/Contexts/JourneyContextProvider";
import { useContext } from "react";

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);

  return context;
};

export const useGameMasterContext = () => {
  const context = useContext(GameMasterContext);

  return context;
};
