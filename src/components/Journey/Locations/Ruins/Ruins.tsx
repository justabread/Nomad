import { JourneyContext } from "@/Contexts/JourneyContextProvider";
import { useContext } from "react";

const Ruins = () => {
  const { EventComponent } = useContext(JourneyContext);

  return (
    <div className="UI-element">
      <h1>The ruins of an unknown city lay before you.</h1>
      <EventComponent.component />
    </div>
  );
};

export default Ruins;
