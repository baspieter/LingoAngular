import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { Game } from 'src/app/Game';
import { FinalWord } from 'src/app/FinalWord';
import { Dashboard } from 'src/app/dashboard';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RoundOffsets } from '@popperjs/core/lib/modifiers/computeStyles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  finalWordProgress!: Array<String>;
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-green-600", "u-bg-orange-500", "u-bg-green-600")
  gameStatus: string = this.gameStatuses[0];
  statusColor: string = this.statusColors[0];
  gameRound: number = 0;
  gameId: number = 0;

  constructor(public sharedGameService: SharedGameService) { }
  ngOnInit(): void {
    this.sharedGameService.dashboardData.subscribe(dashboardData => {
      this.gameId = dashboardData.gameId;
      this.gameRound = dashboardData.round;
      this.gameStatus = this.gameStatuses[dashboardData.status - 1];
      this.statusColor = this.statusColors[dashboardData.status - 1];
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
    });
  }
}
