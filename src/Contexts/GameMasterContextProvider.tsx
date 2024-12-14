import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  PlayerInterface,
  WeaponType,
  MindTraitType,
  BodyTraitType,
} from "@/Types/PlayerTypes";
import { LocationsObjectInterface, Locations } from "@/Types/LocationTypes";
import Preparation from "@/components/Preparation/Preparation";
import Forest from "@/components/Journey/Environments/Forest/Forest";
import Ruins from "@/components/Journey/Environments/Ruins/Ruins";

interface CanRenderInterface {
  preparation: boolean;
  journey: boolean;
}

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  canRender: CanRenderInterface;
  setCanRender: Dispatch<SetStateAction<CanRenderInterface>>;
  playerLocation: LocationsObjectInterface;
  setPlayerLocation: Dispatch<SetStateAction<LocationsObjectInterface>>;
}

const InitialPlayerState: PlayerInterface = {
  health: 100,
  weapon: WeaponType.UNARMED,
  mindTrait: MindTraitType.NO_MIND_TRAIT,
  bodyTrait: BodyTraitType.NO_BODY_TRAIT,
};

export const LocationsObject: Record<Locations, LocationsObjectInterface> = {
  [Locations.LOCATION_START]: {
    name: "Preparation",
    component: Preparation,
  },
  [Locations.LOCATION_FOREST]: {
    name: "Forest",
    component: Forest,
  },
  [Locations.LOCATION_RUINS]: {
    name: "Ruins",
    component: Ruins,
  },
};

export const GameMasterContext = createContext<GameMasterContextInterface>({
  player: InitialPlayerState,
  setPlayer: () => {},
  canRender: { preparation: true, journey: false },
  setCanRender: () => {},
  playerLocation: LocationsObject[Locations.LOCATION_START],
  setPlayerLocation: () => {},
});

export const GameMasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<PlayerInterface>(InitialPlayerState);
  const [canRender, setCanRender] = useState<CanRenderInterface>({
    preparation: true,
    journey: false,
  });

  const [playerLocation, setPlayerLocation] =
    useState<LocationsObjectInterface>(
      LocationsObject[Locations.LOCATION_START]
    );

  return (
    <GameMasterContext.Provider
      value={{
        player,
        setPlayer,
        canRender,
        setCanRender,
        playerLocation,
        setPlayerLocation,
      }}
    >
      {children}
    </GameMasterContext.Provider>
  );
};
