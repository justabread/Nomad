import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { LocationsType, UtilityLocationsEnum } from "@/Types/LocationTypes";
import { InitialPlayerState, PlayerInterface } from "@/components/Player";
import { WeaponInterface } from "@/Types/ItemTypes";

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  setPlayerHealth: (newHealth: number) => void;
  setPlayerFoodItems: (newFoodItems: number) => void;
  setPlayerHealthItems: (newHealthItems: number) => void;
  setPlayerWeapon: (newWeapon: WeaponInterface) => void;
  setPlayerLocation: (newLocation: LocationsType, props?: any) => void;
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
  setPlayerHealth: () => {},
  setPlayerFoodItems: () => {},
  setPlayerHealthItems: () => {},
  setPlayerWeapon: () => {},
  setPlayerLocation: () => {},
});

export const GameMasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<PlayerInterface>(InitialPlayerState);

  const setPlayerValue = (property: keyof typeof player, newValue: number) => {
    if (newValue > 0 && newValue < 100) {
      setPlayer((prev) => ({
        ...prev,
        [property]: newValue,
      }));
    } else if (newValue <= 0) {
      setPlayer((prev) => ({
        ...prev,
        [property]: 0,
      }));
    } else if (newValue >= 100) {
      setPlayer((prev) => ({
        ...prev,
        [property]: 100,
      }));
    }
  };

  const SetPlayerLocation = (newLocationName: LocationsType, props?: any) => {
    setPlayer((prev) => ({
      ...prev,
      location: { name: newLocationName, props: props },
    }));
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
        setPlayerHealth: (newHealth: number) =>
          setPlayerValue("health", newHealth),
        setPlayerFoodItems: (newFoodItems: number) =>
          setPlayerValue("foodItems", newFoodItems),
        setPlayerHealthItems: (newHealthItems: number) =>
          setPlayerValue("healthItems", newHealthItems),
        setPlayerWeapon: (newWeapon: WeaponInterface) => {
          setPlayer((prev) => ({
            ...prev,
            weapon: newWeapon,
          }));
        },
        setPlayerLocation: SetPlayerLocation,
      }}
    >
      {children}
    </GameMasterContext.Provider>
  );
};
