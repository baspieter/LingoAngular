import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dashboard } from '../dashboard';

@Injectable({
  providedIn: 'root'
})

export class SharedGameService {
  private _dashboardData: BehaviorSubject<Dashboard> = new BehaviorSubject<Dashboard>({round: 0, status: 0, gameId: 0, finalWordProgress: ''});
  dashboardData: Observable<Dashboard> = this._dashboardData.asObservable();

  updateDashboard(data: { gameId: number, round: number, status: number, finalWordProgress: String }): void {
    this._dashboardData.next(data);
  }
}
