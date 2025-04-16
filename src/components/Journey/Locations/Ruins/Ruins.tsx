import { useJourneyContext } from "@/utils/useContexts";

const Ruins = () => {
  const { EventComponent } = useJourneyContext();

  return (
    <div className="UI-element">
      <h1>The ruins of an unknown city lay before you.</h1>
      {EventComponent ? <EventComponent.component /> : null}
    </div>
  );
};

export default Ruins;
