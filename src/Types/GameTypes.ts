import { JSX } from "react";
import { EventsType } from "./EventTypes";

export interface NameWithComponentInterface<T> {
  name: T;
  component: (props: any) => JSX.Element;
  events?: NameWithComponentInterface<EventsType>[];
}
