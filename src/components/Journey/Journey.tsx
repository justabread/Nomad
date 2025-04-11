import { useContext } from "react";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { GetLocationComponentByName } from "../Locations";

//REWORK LOCATIONS
//CURRENTLY LOCATION COMPONENTS ARE INITIALIZED ONCE IN THE LOCATION STORE AND CANT ACCEPT PROPS
//REMEMBER TO MAKE IT SO THAT EVERY TIME THE PLAYER MOVES A NEW COMPONENT GETS RENDERED AND RENDER IT WITH PROPS

const Journey = () => {
  const { player } = useContext(GameMasterContext);

  const LocationComponent = GetLocationComponentByName(
    player.location.name
  ).component;

  return (
    <div>
      <LocationComponent {...player.location.props} />
    </div>
  );
};

export default Journey;
