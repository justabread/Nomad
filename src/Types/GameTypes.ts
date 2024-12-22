import { JSX } from "react";

export interface NameWithComponentInterface<T> {
  name: T;
  component: (props: any) => JSX.Element;
}
