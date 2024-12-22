import { EnemyInterface } from "@/components/Player";

import { createContext, useContext } from "react";
import { GameMasterContext } from "./GameMasterContextProvider";
import {
  JourneyLocationsEnum,
  UtilityLocationsEnum,
} from "@/Types/LocationTypes";

interface JourneyContextInterface {
  InitiateFight: (fight: {
    location: JourneyLocationsEnum;
    enemies: EnemyInterface[];
  }) => void;
}

export const JourneyContext = createContext<JourneyContextInterface>({
  InitiateFight: () => {},
});

export const JourneyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setPlayer, setPlayerLocation } = useContext(GameMasterContext);

  const InitiateFight = (fight: {
    location: JourneyLocationsEnum;
    enemies: EnemyInterface[];
  }) => {
    setPlayer((prev) => ({
      ...prev,
      currentFight: fight,
    }));
    setPlayerLocation(UtilityLocationsEnum.LOCATION_FIGHT);
  };

  return (
    <JourneyContext.Provider
      value={{
        InitiateFight: InitiateFight,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
