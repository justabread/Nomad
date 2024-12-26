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
import { LootingProps } from "@/components/Journey/Environments/Looting/Looting";

interface JourneyContextInterface {
  InitiateFight: (fight: {
    location: JourneyLocationsEnum;
    enemies: EnemyInterface[];
  }) => void;
  InitiateLooting: (props: LootingProps) => void;
}

export const JourneyContext = createContext<JourneyContextInterface>({
  InitiateFight: () => {},
  InitiateLooting: () => {},
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

  const InitiateLooting = (props: LootingProps) => {
    setPlayerLocation(UtilityLocationsEnum.LOCATION_LOOTING, props);
  };

  return (
    <JourneyContext.Provider
      value={{
        InitiateFight: InitiateFight,
        InitiateLooting: InitiateLooting,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
