import { useContext, ChangeEvent, useEffect } from "react";
import styles from "./Preparation.module.css";
import Select from "@/components/Select/Select";
import { GameMasterContext } from "../../Contexts/GameMasterContextProvider";
import {
  BodyTraitsEnum,
  MindTraitsEnum,
  WeaponsEnum,
} from "@/Types/PlayerTypes";
import useGenerateRandomElement from "../Journey/Environments/useGenerateRandomElement";
import {
  LocationNamesEnum,
  LocationsObjectInterface,
} from "@/Types/LocationTypes";
import { GetLocationsWithoutUtilities } from "../Locations";

const Preparation = () => {
  const { player, setPlayer, setPlayerLocation } =
    useContext(GameMasterContext);

  const handleWeaponChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({
      ...prev,
      weapon: e.target.value as WeaponsEnum,
    }));
  };

  const handleMindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({
      ...prev,
      mindTrait: e.target.value as MindTraitsEnum,
    }));
  };

  const handleBodyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({
      ...prev,
      bodyTrait: e.target.value as BodyTraitsEnum,
    }));
  };

  const StartGame = () => {
    const locationsRecord = Object.fromEntries(
      GetLocationsWithoutUtilities()
    ) as Record<LocationNamesEnum, LocationsObjectInterface>;

    setPlayerLocation(useGenerateRandomElement(locationsRecord)[0]);
  };

  return (
    <div className={`${styles.preparationContainer} UI-element`}>
      <h1>Welcome to Nomad</h1>
      <h2>Prepare your nomad and embark on a journey.</h2>
      <div className={styles.selectorsContainer}>
        <div>
          <div className="weaponRow">
            <Select
              label="Weapon to bring"
              options={[
                { title: "Unarmed", value: WeaponsEnum.UNARMED },
                { title: "Knife", value: WeaponsEnum.KNIFE },
                { title: "Pistol", value: WeaponsEnum.PISTOL },
                { title: "Rifle", value: WeaponsEnum.RIFLE },
              ]}
              onChange={handleWeaponChange}
              value={player.weapon}
            ></Select>
          </div>
          <div className="traitMind">
            <Select
              label="Mind Trait"
              options={[
                {
                  title: "No Mind Trait",
                  value: MindTraitsEnum.NO_MIND_TRAIT,
                },
                { title: "Anxious", value: MindTraitsEnum.ANXIOUS },
                { title: "Brave", value: MindTraitsEnum.BRAVE },
                {
                  title: "Schizophrenic",
                  value: MindTraitsEnum.SCHIZOPHRENIC,
                },
              ]}
              onChange={handleMindChange}
              value={player.mindTrait}
            ></Select>
          </div>
          <div className="traitBody">
            <Select
              label="Body Trait"
              options={[
                {
                  title: "No Body Trait",
                  value: BodyTraitsEnum.NO_BODY_TRAIT,
                },
                { title: "Fat", value: BodyTraitsEnum.FAT },
                { title: "Athletic", value: BodyTraitsEnum.ATHLETIC },
                { title: "Strong", value: BodyTraitsEnum.STRONG },
              ]}
              onChange={handleBodyChange}
              value={player.bodyTrait}
            ></Select>
          </div>
        </div>
        <button onClick={StartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Preparation;
