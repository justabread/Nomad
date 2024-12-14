import { useContext, ChangeEvent, useEffect } from "react";
import styles from "./Preparation.module.css";
import Select from "@/components/Select/Select";
import { GameMasterContext } from "../../Contexts/GameMasterContextProvider";
import { BodyTraitType, MindTraitType, WeaponType } from "@/Types/PlayerTypes";

const Preparation = () => {
  const { player, setPlayer, canRender, setCanRender } =
    useContext(GameMasterContext);

  const handleWeaponChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({ ...prev, weapon: e.target.value as WeaponType }));
  };

  const handleMindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({
      ...prev,
      mindTrait: e.target.value as MindTraitType,
    }));
  };

  const handleBodyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayer((prev) => ({
      ...prev,
      bodyTrait: e.target.value as BodyTraitType,
    }));
  };

  const StartGame = () => {
    setCanRender((prev) => ({ ...prev, preparation: false, forest: true }));
  };

  return (
    <div className={styles.preparationContainer}>
      <h1>Welcome to Nomad</h1>
      <h2>Prepare your nomad and embark on a journey.</h2>
      <div className={styles.selectorsContainer}>
        <div>
          <div className="weaponRow">
            <Select
              label="Weapon to bring"
              options={[
                { title: "Unarmed", value: WeaponType.UNARMED },
                { title: "Knife", value: WeaponType.KNIFE },
                { title: "Pistol", value: WeaponType.PISTOL },
                { title: "Rifle", value: WeaponType.RIFLE },
              ]}
              onChange={handleWeaponChange}
              value={player.weapon}
            ></Select>
          </div>
          <div className="traitMind">
            <Select
              label="Mind Trait"
              options={[
                { title: "No Mind Trait", value: MindTraitType.NO_MIND_TRAIT },
                { title: "Anxious", value: MindTraitType.ANXIOUS },
                { title: "Brave", value: MindTraitType.BRAVE },
                { title: "Schizophrenic", value: MindTraitType.SCHIZOPHRENIC },
              ]}
              onChange={handleMindChange}
              value={player.mindTrait}
            ></Select>
          </div>
          <div className="traitBody">
            <Select
              label="Body Trait"
              options={[
                { title: "No Body Trait", value: BodyTraitType.NO_BODY_TRAIT },
                { title: "Fat", value: BodyTraitType.FAT },
                { title: "Athletic", value: BodyTraitType.ATHLETIC },
                { title: "Strong", value: BodyTraitType.STRONG },
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
