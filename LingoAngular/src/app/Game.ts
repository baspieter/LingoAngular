export interface Game {
  id?: number;
  round: number;
  status: number;
  finalWordProgress: String;
  greenBalls: number;
  redBalls: number;
}