import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dashboard } from '../dashboard';

@Injectable({
  providedIn: 'root'
})

export class SharedGameService {
  private _dashboardData: BehaviorSubject<Dashboard> = new BehaviorSubject<Dashboard>({round: 0, status: 0, gameId: 0, finalWordProgress: ''});
  dashboardData: Observable<Dashboard> = this._dashboardData.asObservable();

  private _nextRoundBtn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)
  nextRoundBtn: Observable<Boolean> = this._nextRoundBtn.asObservable();

  private _gameMessage: BehaviorSubject<String> = new BehaviorSubject<String>("<p>Game results are shown here.</p>")
  gameMessage: Observable<String> = this._gameMessage.asObservable();

  updateDashboard(data: { gameId: number, round: number, status: number, finalWordProgress: String }): void {
    this._dashboardData.next(data);
  }

  updateNextRoundBtn(active: Boolean) {
    this._nextRoundBtn.next(active);
  }

  updateGameMessage(message: String) {
    this._gameMessage.next(message);
  }
}
