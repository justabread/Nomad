import { JSX } from "react";

const useGenerateRandomEvent = (Events: {
  [key: string]: () => JSX.Element;
}) => {
  const randomEventIndex = Math.floor(
    Math.random() * Object.values(Events).length
  );
  const selectedEvent = Object.values(Events)[randomEventIndex];
  return selectedEvent;
};

export default useGenerateRandomEvent;
