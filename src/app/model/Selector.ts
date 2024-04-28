import { Website } from "./Website";

// selector.model.ts
export interface Selector {
  id: number;
  website: number;
  selectors: any; // Object containing selector data (structure depends on your backend implementation)
}
