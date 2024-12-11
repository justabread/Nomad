enum ForestEventKeys {
  EVENT_CALM = "EVENT_CALM",
  ENCOUNTER_WOLF = "ENCOUNTER_WOLF",
}

const ForestEvents = {
  [ForestEventKeys.EVENT_CALM]: <h1>You are walking through a forest.</h1>,
  [ForestEventKeys.ENCOUNTER_WOLF]: <h1>You encounter a wolf.</h1>,
};

const GenerateForestEvents = () => {
  const randomEvent = Math.floor(
    Math.random() * Object.values(ForestEvents).length
  );
  return Object.values(ForestEvents)[randomEvent];
};

const Forest = () => {
  return <div>{GenerateForestEvents()}</div>;
};

export default Forest;
