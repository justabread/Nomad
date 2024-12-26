import { Events } from "@/Types/EventTypes";
import { FC } from "react";

interface EventProps {
  Event: Events;
}

const Event: FC<EventProps> = ({ Event }) => {
  return <div>{Event}</div>;
};

export default Event;
