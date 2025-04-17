import { ItemPoolInterface } from "@/Types/ItemTypes";
import { EventsType, RuinsEventsEnum } from "@/Types/EventTypes";
import { WeaponNamesEnum } from "@/Types/ItemTypes";
import { GetAllWeapons } from "./Weapons";
import { generateRandomElement, generateRandomNumber } from "@/utils/Utils";

const ItemPoolObjects: ItemPoolInterface[] = [
  {
    name: RuinsEventsEnum.EVENT_MALL,
    newFoodItems: generateRandomNumber(5),
    newAidItems: generateRandomNumber(3),
    newWeapon: generateRandomElement(
      GetAllWeapons([WeaponNamesEnum.UNARMED_FISTS])
    ),
  },
  {
    name: RuinsEventsEnum.EVENT_STORE_GUNS,
    newWeapon: generateRandomElement(
      GetAllWeapons([WeaponNamesEnum.UNARMED_FISTS])
    ),
  },
  {
    name: RuinsEventsEnum.EVENT_STORE_PHARMACY,
    newAidItems: generateRandomNumber(5),
  },
  {
    name: RuinsEventsEnum.EVENT_RESTAURANT,
    newFoodItems: generateRandomNumber(5),
  },
];

export const GetItemPool = (itemPoolName: EventsType): ItemPoolInterface => {
  const itemPoolObject = ItemPoolObjects.find(
    (element) => element.name === itemPoolName
  );

  if (!itemPoolObject) {
    throw new Error(`Weapon ${itemPoolObject} not found`);
  }

  return itemPoolObject;
};
