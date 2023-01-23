import { WordEntry } from "./WordEntry";

export interface GameWord {
  id?: number;
  wordEntries: Array<WordEntry>;
  finished: Boolean;
}