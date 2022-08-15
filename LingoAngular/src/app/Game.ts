export interface Game {
  id?: number;
  round: number;
  status: number;
  finalWordProgress: [];
  greenBalls: number;
  redBalls: number;
}