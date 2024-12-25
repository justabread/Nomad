import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { GameMasterContext } from "./GameMasterContextProvider";
import {
  JourneyLocationsEnum,
  UtilityLocationsEnum,
} from "@/Types/LocationTypes";
import { EnemyInterface } from "@/Types/EnemyTypes";
import { WeaponInterface, WeaponNamesEnum } from "@/Types/ItemTypes";
import {
  useGenerateRandomElement,
  useGenerateRandomNumber,
} from "@/components/Journey/Environments/useGenerateRandoms";
import { GetAllWeapons } from "@/components/Weapons";

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

  const InitiaiteLooting = () => {
    setPlayerLocation(UtilityLocationsEnum.LOCATION_LOOTING);
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
