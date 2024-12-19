import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import PlayerCamp from "@/components/Journey/Environments/PlayerCamp/PlayerCamp";
import Death from "@/components/Journey/Environments/Death/Death";

interface GameMasterContextInterface {
  player: PlayerInterface;
  setPlayer: Dispatch<SetStateAction<PlayerInterface>>;
  playerLocation: LocationNamesEnum;
  setPlayerLocation: Dispatch<SetStateAction<LocationNamesEnum>>;
}

/**
 * InitialPlayerState
 *
 * @remarks
 * The initial state of the player
 */
const InitialPlayerState: PlayerInterface = {
  health: 100,
  weapon: WeaponsEnum.UNARMED,
  food: 0,
  firstAidKits: 0,
  mindTrait: MindTraitsEnum.NO_MIND_TRAIT,
  bodyTrait: BodyTraitsEnum.NO_BODY_TRAIT,
};

/**
 * LocationsObject
 *
 * @remarks
 * The object contains all the locations in the game
 */
export const LocationsObject: Record<
  LocationNamesEnum,
  LocationsObjectInterface
> = {
  [LocationNamesEnum.LOCATION_START]: {
    name: LocationNamesEnum.LOCATION_START,
    component: Preparation,
    utilityLocation: true,
  },
  [LocationNamesEnum.LOCATION_CAMP_PLAYER]: {
    name: LocationNamesEnum.LOCATION_CAMP_PLAYER,
    component: PlayerCamp,
    utilityLocation: true,
  },
  [LocationNamesEnum.LOCATION_DEATH]: {
    name: LocationNamesEnum.LOCATION_DEATH,
    component: Death,
    utilityLocation: true,
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

/**
 * GameMasterContext
 *
 * @remarks
 * The context contains all data child components need access to
 */
export const GameMasterContext = createContext<GameMasterContextInterface>({
  player: InitialPlayerState,
  setPlayer: () => {},
  playerLocation: LocationNamesEnum.LOCATION_START,
  setPlayerLocation: () => {},
});

export const GetLocationsWithoutUtilities = () => {
  const locationsWithoutUtilities = Object.entries(LocationsObject).filter(
    ([key, value]) =>
      value.utilityLocation === undefined || value.utilityLocation === false
  );

  return locationsWithoutUtilities;
};

export const GameMasterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [player, setPlayer] = useState<PlayerInterface>(InitialPlayerState);

  const [playerLocation, setPlayerLocation] = useState<LocationNamesEnum>(
    LocationNamesEnum.LOCATION_START
  );

  useEffect(() => {
    if (player.health <= 0) {
      setPlayerLocation(LocationNamesEnum.LOCATION_DEATH);
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
        playerLocation,
        setPlayerLocation,
      }}
    >
      {children}
    </GameMasterContext.Provider>
  );
};
