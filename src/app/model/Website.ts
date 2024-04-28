
import { Selector } from "./Selector";

export interface Website {
  id: number;
  name: string;
  url: string;
  selectors?: Selector[]; // An array of Selector objects (optional)
}
