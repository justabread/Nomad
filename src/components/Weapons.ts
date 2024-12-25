import {
  WeaponInterface,
  WeaponNamesEnum,
  WeaponsCategoriesEnum,
} from "@/Types/ItemTypes";

const WeaponObjects: WeaponInterface[] = [
  {
    name: WeaponNamesEnum.UNARMED_FISTS,
    category: WeaponsCategoriesEnum.UNARMED,
    minDamage: 3,
    maxDamage: 5,
    actionPoints: 6,
    description:
      "Your hands clenched into fists. Your most reliable and sometimes only option.",
  },
  {
    name: WeaponNamesEnum.KNIFE_KITCHEN,
    category: WeaponsCategoriesEnum.KNIFE,
    minDamage: 4,
    maxDamage: 8,
    actionPoints: 4,
    description:
      "A simple kitchen knife, most likely not being used for it's intended purpose anymore.",
  },
  {
    name: WeaponNamesEnum.KNIFE_HUNTING,
    category: WeaponsCategoriesEnum.KNIFE,
    minDamage: 5,
    maxDamage: 12,
    actionPoints: 3,
    description:
      "Someone's old hunting knife. Elegant, comfortable and dangerous.",
  },
  {
    name: WeaponNamesEnum.KNIFE_BUTTERFLY,
    category: WeaponsCategoriesEnum.KNIFE,
    minDamage: 5,
    maxDamage: 10,
    actionPoints: 4,
    description:
      "A butterfly knife. People used to do fancy tricks with these, back then. You tried too, but you cut your finger while trying.",
  },
  {
    name: WeaponNamesEnum.PISTOL_REVOLVER,
    category: WeaponsCategoriesEnum.PISTOL,
    minDamage: 8,
    maxDamage: 14,
    actionPoints: 2,
    description:
      "A faded revolver chambered in .44 magnum. Like in that old movie.",
  },
  {
    name: WeaponNamesEnum.PISTOL_AUTOMATIC,
    category: WeaponsCategoriesEnum.PISTOL,
    minDamage: 7,
    maxDamage: 12,
    actionPoints: 4,
    description: "An automatic pistol with a magazine in the grip.",
  },
  {
    name: WeaponNamesEnum.RIFLE_HUNTING,
    category: WeaponsCategoriesEnum.RIFLE,
    minDamage: 5,
    maxDamage: 12,
    actionPoints: 2,
    description:
      "A good, old bolt-action hunting rifle. You remember your father using one like this to hunt deer when you were young. Used more against people nowadays.",
  },
  {
    name: WeaponNamesEnum.RIFLE_AUTOMATIC,
    category: WeaponsCategoriesEnum.RIFLE,
    minDamage: 6,
    maxDamage: 10,
    actionPoints: 3,
    description:
      "A surprisingly good looking assault rifle. There is something written on the receiver but the letters are foreign to you.",
  },
  {
    name: WeaponNamesEnum.SHOTGUN_DOUBLE_BARRELED,
    category: WeaponsCategoriesEnum.SHOTGUN,
    minDamage: 12,
    maxDamage: 20,
    actionPoints: 1,
    description:
      "A shotgun with two barrels. You get a strange feeling holding it, like you want to rip and tear.",
  },
  {
    name: WeaponNamesEnum.SHOTGUN_PUMP,
    category: WeaponsCategoriesEnum.SHOTGUN,
    minDamage: 12,
    maxDamage: 18,
    actionPoints: 2,
    description:
      "A shotgun with a pump under the barrel for faster chambering. Much better than loading them manually.",
  },
  {
    name: WeaponNamesEnum.SHOTGUN_AUTOMATIC,
    category: WeaponsCategoriesEnum.SHOTGUN,
    minDamage: 12,
    maxDamage: 15,
    actionPoints: 3,
    description:
      "A shotgun that can load shells on it's own. Until it jams of course.",
  },
];

export const GetWeaponByName = (
  weaponName: WeaponNamesEnum
): WeaponInterface => {
  const weaponObject = WeaponObjects.find(
    (element) => element.name === weaponName
  );

  if (!weaponObject) {
    throw new Error(`Weapon ${weaponObject} not found`);
  }

  return weaponObject;
};

export const GetAllWeapons = (exclude?: WeaponNamesEnum[]) => {
  if (exclude) {
    return WeaponObjects.filter(
      (weapon) =>
        !exclude.some((weaponToExclude) => weapon.name === weaponToExclude)
    );
  }
  return WeaponObjects;
};
