import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  PlayerInterface,
  WeaponType,
  MindTraitType,
  BodyTraitType,
} from "@/Types/PlayerTypes";
import { LocationType } from "@/Types/LocationTypes";

interface CanRenderInterface {
  preparation: boolean;
  forest: boolean;
}

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  canRender: CanRenderInterface;
  setCanRender: Dispatch<SetStateAction<CanRenderInterface>>;
  playerLocation: LocationType;
  setPlayerLocation: Dispatch<SetStateAction<LocationType>>;
}

const InitialPlayerState: PlayerInterface = {
  health: 100,
  weapon: WeaponType.UNARMED,
  mindTrait: MindTraitType.NO_MIND_TRAIT,
  bodyTrait: BodyTraitType.NO_BODY_TRAIT,
};

export const GameMasterContext = createContext<GameMasterContextInterface>({
  player: InitialPlayerState,
  setPlayer: () => {},
  canRender: { preparation: true, forest: false },
  setCanRender: () => {},
  playerLocation: LocationType.LOCATION_START,
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
    forest: false,
  });

  const [playerLocation, setPlayerLocation] = useState<LocationType>(
    LocationType.LOCATION_START
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
