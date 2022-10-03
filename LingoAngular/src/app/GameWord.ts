export interface GameWord {
  id?: number;
  wordProgress: Array<String>;
  wordLetterProgress: Array<Number>;
  finished: Boolean;
}