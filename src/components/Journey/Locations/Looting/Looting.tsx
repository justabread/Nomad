import { JourneyContext } from "@/Contexts/JourneyContextProvider";
import { useContext, useState } from "react";
import {
  useGenerateRandomElement,
  useGenerateRandomNumber,
} from "../useGenerateRandoms";
import { GetAllWeapons } from "@/components/Weapons";
import { WeaponInterface, WeaponNamesEnum } from "@/Types/ItemTypes";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { JourneyLocationsEnum } from "@/Types/LocationTypes";

interface ItemPoolInterface {
  newFoodItems?: number;
  newAidItems?: number;
  newWeapon?: WeaponInterface;
}

export interface LootingProps {
  title: string;
  givenItemPool: ItemPoolInterface;
  locationWhereLooting: JourneyLocationsEnum;
}

const Looting = ({
  title,
  givenItemPool,
  locationWhereLooting,
}: LootingProps) => {
  const { player, setPlayer, setPlayerLocation } =
    useContext(GameMasterContext);

  const [itemPool, setItemPool] = useState<ItemPoolInterface>(givenItemPool);
  const [didPlayerFindWeapon, setDidPlayerFindWeapon] = useState<boolean>(
    useGenerateRandomNumber(100) <= 15
  );

  return (
    <div>
      <h2>{title}</h2>
      <p>After a couple hours of work you look at what you found.</p>
      {/**If the the location should contain food items and the player found more than or equal to 0 food items */}
      {itemPool.newFoodItems !== undefined ? (
        itemPool.newFoodItems > 0 ? (
          <p>You manage to find {itemPool.newFoodItems} edible things.</p>
        ) : (
          <p>You fail to find anything edible.</p>
        )
      ) : null}
      {/**If the the location should contain aid items and the player found more than or equal to 0 aid items */}
      {itemPool.newAidItems !== undefined ? (
        itemPool.newAidItems > 0 ? (
          <p>
            You manage to find {itemPool.newAidItems} things that could heal
            your wounds in a tight spot.
          </p>
        ) : (
          <p>You fail to find anything to heal yourself with.</p>
        )
      ) : null}
      {/**If the the location should contain weapons and the player found a weapon */}
      {itemPool.newWeapon !== undefined ? (
        didPlayerFindWeapon ? (
          <div>
            <p>
              You found a {itemPool.newWeapon.name} that you could use in a
              fight. Will you switch your current weapon to this one? Your old
              weapon will be discarded.
            </p>
            <button
              onClick={() => {
                if (itemPool.newWeapon) {
                  setPlayer((prev) => ({
                    ...prev,
                    weapon: itemPool.newWeapon as WeaponInterface,
                  }));
                }
              }}
            >
              Switch Weapons
            </button>
          </div>
        ) : (
          <p>You fail to find any new weapon.</p>
        )
      ) : null}
      <button
        onClick={() => {
          var newPlayer = player;

          if (itemPool.newAidItems) {
            newPlayer.aidItems += itemPool.newAidItems;
          }

          if (itemPool.newFoodItems) {
            newPlayer.foodItems += itemPool.newFoodItems;
          }

          setPlayer(newPlayer);
          setPlayerLocation(locationWhereLooting);
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default Looting;
