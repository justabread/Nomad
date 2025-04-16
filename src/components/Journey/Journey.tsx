import { useContext, useEffect } from "react";
import { GameMasterContext } from "@/Contexts/GameMasterContextProvider";
import { GetLocationComponentByName } from "../Locations";
import { useJourneyContext } from "@/utils/useContexts";

//REWORK LOCATIONS
//CURRENTLY LOCATION COMPONENTS ARE INITIALIZED ONCE IN THE LOCATION STORE AND CANT ACCEPT PROPS
//REMEMBER TO MAKE IT SO THAT EVERY TIME THE PLAYER MOVES A NEW COMPONENT GETS RENDERED AND RENDER IT WITH PROPS

const Journey = () => {
  const { player } = useContext(GameMasterContext);
  const { setAllEvents } = useJourneyContext();

  const location = GetLocationComponentByName(player.location.name);

  const LocationComponent = location.component;
  const locationEvents = location.events;

  useEffect(() => {
    setAllEvents(locationEvents ?? []);
  }, [locationEvents, setAllEvents]);

  return (
    <div>
      <LocationComponent {...player.location.props} />
    </div>
  );
};

export default Journey;
