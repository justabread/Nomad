import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  WeaponsEnum,
  MindTraitsEnum,
  BodyTraitsEnum,
} from "@/Types/PlayerTypes";
import {
  LocationsObjectInterface,
  LocationNamesEnum,
} from "@/Types/LocationTypes";
import { InitialPlayerState, PlayerInterface } from "@/components/Player";
import { LocationsObject } from "@/components/Locations";

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  setPlayerLocation: Function;
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

  const SetPlayerLocation = (newLocation: LocationNamesEnum) => {
    setPlayer((prev) => ({ ...prev, location: newLocation }));
  };

  useEffect(() => {
    if (player.health <= 0) {
      SetPlayerLocation(LocationNamesEnum.LOCATION_DEATH);
    }
  }, [player.health]);

  // const sanitizedSetPlayerLocation = (newLocation: LocationNamesEnum) => {
  //   if (player.health <= 0) {
  //     setPlayerLocation(LocationNamesEnum.LOCATION_DEATH);
  //   } else {
  //     setPlayerLocation(newLocation);
  //   }
  // };

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
