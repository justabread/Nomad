import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { LocationsType, UtilityLocationsEnum } from "@/Types/LocationTypes";
import { InitialPlayerState, PlayerInterface } from "@/components/Player";

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  setPlayerLocation: (newLocation: LocationsType) => void;
}

/**
 * GameMasterContext
 *
 * @remarks
 * The context contains all data child components need access to
 */
export const GameMasterContext = createContext<GameMasterContextInterface>({
  player: InitialPlayerState,
  setPlayer: () => {},
  setPlayerLocation: () => {},
});

export const GameMasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<PlayerInterface>(InitialPlayerState);

  const SetPlayerLocation = (newLocation: LocationsType) => {
    setPlayer((prev) => ({ ...prev, location: newLocation }));
  };

  useEffect(() => {
    if (player.health <= 0) {
      SetPlayerLocation(UtilityLocationsEnum.LOCATION_DEATH);
    }
  }, [player.health]);

  return (
    <GameMasterContext.Provider
      value={{
        player,
        setPlayer,
        setPlayerLocation: SetPlayerLocation,
      }}
    >
      {children}
    </GameMasterContext.Provider>
  );
};
