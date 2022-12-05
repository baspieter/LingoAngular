import { Component, EventEmitter, Output } from '@angular/core';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Output() onNextRound: EventEmitter<{ gameId: number }> = new EventEmitter();

  finalWordProgress!: Array<String>;
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-green-600", "u-bg-orange-500", "u-bg-green-600")
  gameStatus: string = this.gameStatuses[0];
  statusColor: string = this.statusColors[0];
  gameRound: number = 0;
  gameId: number = 0;
  activeNextRoundBtn: Boolean = false;
  gameMessage: String = "<p class='u-text-xs'>Game results are shown here.</p>";

  constructor(public sharedGameService: SharedGameService) { }
  ngOnInit(): void {
    this.sharedGameService.dashboardData.subscribe(dashboardData => {
      this.gameId = dashboardData.gameId;
      this.gameRound = dashboardData.round;
      this.gameStatus = this.gameStatuses[dashboardData.status - 1];
      this.statusColor = this.statusColors[dashboardData.status - 1];
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
    });

    this.sharedGameService.nextRoundBtn.subscribe(nextRoundBtn => {
      this.activeNextRoundBtn = nextRoundBtn;
      this.gameRound = this.gameRound - 1;
    });

    this.sharedGameService.gameMessage.subscribe((gameMessage) => this.gameMessage = gameMessage);
  }

  nextRound() {
    if (this.gameId) {
      this.onNextRound.emit({gameId: this.gameId});
    }
  }
}
