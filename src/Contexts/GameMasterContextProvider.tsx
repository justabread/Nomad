import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  PlayerInterface,
  WeaponsEnum,
  MindTraitsEnum,
  BodyTraitsEnum,
} from "@/Types/PlayerTypes";
import {
  LocationsObjectInterface,
  LocationNamesEnum,
} from "@/Types/LocationTypes";
import Preparation from "@/components/Preparation/Preparation";
import Forest from "@/components/Journey/Environments/Forest/Forest";
import Ruins from "@/components/Journey/Environments/Ruins/Ruins";

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  playerLocation: LocationNamesEnum;
  setPlayerLocation: Dispatch<SetStateAction<LocationNamesEnum>>;
}

const InitialPlayerState: PlayerInterface = {
  health: 100,
  weapon: WeaponsEnum.UNARMED,
  mindTrait: MindTraitsEnum.NO_MIND_TRAIT,
  bodyTrait: BodyTraitsEnum.NO_BODY_TRAIT,
};

export const LocationsObject: Record<
  LocationNamesEnum,
  LocationsObjectInterface
> = {
  [LocationNamesEnum.LOCATION_START]: {
    name: LocationNamesEnum.LOCATION_START,
    component: Preparation,
  },
  [LocationNamesEnum.LOCATION_FOREST]: {
    name: LocationNamesEnum.LOCATION_FOREST,
    component: Forest,
  },
  [LocationNamesEnum.LOCATION_RUINS]: {
    name: LocationNamesEnum.LOCATION_RUINS,
    component: Ruins,
  },
};

export const GameMasterContext = createContext<GameMasterContextInterface>({
  player: InitialPlayerState,
  setPlayer: () => {},
  playerLocation: LocationNamesEnum.LOCATION_START,
  setPlayerLocation: () => {},
});

export const GameMasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<PlayerInterface>(InitialPlayerState);

  const [playerLocation, setPlayerLocation] = useState<LocationNamesEnum>(
    LocationNamesEnum.LOCATION_START
  );

  return (
    <GameMasterContext.Provider
      value={{
        player,
        setPlayer,
        playerLocation,
        setPlayerLocation,
      }}
    >
      {children}
    </GameMasterContext.Provider>
  );
};
