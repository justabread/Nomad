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
} from "@/components/Journey/Locations/useGenerateRandoms";
import { GetAllWeapons } from "@/components/Weapons";
import { LootingProps } from "@/components/Journey/Locations/Looting/Looting";
import { FightingProps } from "@/components/Journey/Locations/Fighting/Fighting";

interface JourneyContextInterface {
  InitiateFight: (props: FightingProps) => void;
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
  const { setPlayerLocation } = useContext(GameMasterContext);

  const InitiateFight = (props: FightingProps) => {
    setPlayerLocation(UtilityLocationsEnum.LOCATION_FIGHT, props);
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
