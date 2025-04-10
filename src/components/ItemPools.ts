import { ItemPoolInterface } from "@/Types/ItemTypes";
import { EventsType, RuinsEventsEnum } from "@/Types/EventTypes";
import { WeaponNamesEnum } from "@/Types/ItemTypes";
import { useGenerateRandomNumber, useGenerateRandomElement } from "./Journey/Locations/useGenerateRandoms";
import { GetAllWeapons } from "./Weapons";

const ItemPoolObjects: ItemPoolInterface[] = [{
    name: RuinsEventsEnum.EVENT_MALL,
    newFoodItems: useGenerateRandomNumber(5),
    newAidItems: useGenerateRandomNumber(3),
    newWeapon: useGenerateRandomElement(
        GetAllWeapons([WeaponNamesEnum.UNARMED_FISTS])
    ),
},
{
    name: RuinsEventsEnum.EVENT_STORE_GUNS,
    newWeapon: useGenerateRandomElement(
        GetAllWeapons([WeaponNamesEnum.UNARMED_FISTS])
    ),

},
{
    name: RuinsEventsEnum.EVENT_STORE_PHARMACY,
    newAidItems: useGenerateRandomNumber(5)
},
{
    name: RuinsEventsEnum.EVENT_RESTAURANT,
    newFoodItems: useGenerateRandomNumber(5)
}];

export const GetItemPool = (itemPoolName: EventsType): ItemPoolInterface => {
    const itemPoolObject = ItemPoolObjects.find(
        (element) => element.name === itemPoolName
    );

    if (!itemPoolObject) {
        throw new Error(`Weapon ${itemPoolObject} not found`);
    }

    return itemPoolObject;
}