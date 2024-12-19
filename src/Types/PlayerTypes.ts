import { LocationNamesEnum } from "./LocationTypes";

export enum WeaponsEnum {
  UNARMED = "Unarmed",
  KNIFE = "Knife",
  PISTOL = "Pistol",
  RIFLE = "Rifle",
}
export enum MindTraitsEnum {
  NO_MIND_TRAIT = "No Mind Trait",
  ANXIOUS = "Anxious",
  BRAVE = "Brave",
  SCHIZOPHRENIC = "Schizophrenic",
}
export enum BodyTraitsEnum {
  NO_BODY_TRAIT = "No Body Trait",
  FAT = "Fat",
  ATHLETIC = "Athletic",
  STRONG = "Strong",
}

export type TraitType = MindTraitsEnum | BodyTraitsEnum;
