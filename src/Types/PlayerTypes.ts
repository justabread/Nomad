import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export enum WeaponType {
  UNARMED = "Unarmed",
  KNIFE = "Knife",
  PISTOL = "Pistol",
  RIFLE = "Rifle",
}
export enum MindTraitType {
  NO_MIND_TRAIT = "No Mind Trait",
  ANXIOUS = "Anxious",
  BRAVE = "Brave",
  SCHIZOPHRENIC = "Schizophrenic",
}
export enum BodyTraitType {
  NO_BODY_TRAIT = "No Body Trait",
  FAT = "Fat",
  ATHLETIC = "Athletic",
  STRONG = "Strong",
}

export interface PlayerInterface {
  health: number;
  weapon: WeaponType;
  mindTrait: MindTraitType;
  bodyTrait: BodyTraitType;
}

export type TraitType = MindTraitType | BodyTraitType;
