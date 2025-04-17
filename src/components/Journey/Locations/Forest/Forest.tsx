import { useJourneyContext } from "@/utils/useContexts";

const Forest = () => {
  const { EventComponent } = useJourneyContext();

  return (
    <div className="UI-element">
      <h1>You are walking through a forest.</h1>
      {EventComponent ? <EventComponent.component /> : null}
    </div>
  );
};

export default Forest;
