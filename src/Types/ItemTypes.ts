import { EventsType } from "./EventTypes";

export enum WeaponsCategoriesEnum {
  UNARMED = "Unarmed",
  KNIFE = "Knife",
  PISTOL = "Pistol",
  RIFLE = "Rifle",
  SHOTGUN = "Shotgun",
}

export enum WeaponNamesEnum {
  UNARMED_FISTS = "Your Fists",
  KNIFE_KITCHEN = "Kitchen Knife",
  KNIFE_HUNTING = "Hunting Knife",
  KNIFE_BUTTERFLY = "Butterfly Knife",
  PISTOL_REVOLVER = "Revolver",
  PISTOL_AUTOMATIC = "Automatic Pistol",
  RIFLE_HUNTING = "Hunting Rifle",
  RIFLE_AUTOMATIC = "Automatic Rifle",
  SHOTGUN_DOUBLE_BARRELED = "Double-Barreled Shotgun",
  SHOTGUN_PUMP = "Pump-Action Shotgun",
  SHOTGUN_AUTOMATIC = "Automatic Shotgun",
}

export interface WeaponInterface {
  name: string;
  minDamage: number;
  maxDamage: number;
  actionPoints: number;
  category: WeaponsCategoriesEnum;
  description: string;
}

export interface ItemPoolInterface {
  name: EventsType;
  newFoodItems?: number;
  newAidItems?: number;
  newWeapon?: WeaponInterface
}
