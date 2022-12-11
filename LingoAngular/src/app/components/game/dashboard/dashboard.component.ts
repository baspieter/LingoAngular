import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Output() onNextRound: EventEmitter<{ gameId: number }> = new EventEmitter();
  @ViewChild( 'timer', { static: false } ) cdTimer!: CdTimerComponent;

  dataLoaded!: Promise<boolean>
  finalWordProgress!: Array<String>;
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-green-600", "u-bg-orange-500", "u-bg-green-600")
  gameStatus: string = this.gameStatuses[0];
  statusColor: string = this.statusColors[0];
  gameRound: number = 0;
  gameId!: number;
  activeNextRoundBtn: Boolean = false;
  gameMessage: String = "<p class='u-text-xs'>Game results are shown here.</p>";

  dashboardObserver!: Subscription;
  timerObserver!: Subscription;
  nextButtonObserver!: Subscription;
  messageObserver!: Subscription;

  constructor(public gameService: GameService, public sharedGameService: SharedGameService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.timerObserver = this.sharedGameService.savedTimer.subscribe((time) => {
      if (this.cdTimer) this.setTimer(time)
    });
  }

  ngOnInit () {
    this.dashboardObserver = this.sharedGameService.dashboardData.subscribe(dashboardData => {
      this.gameId = dashboardData.gameId;
      this.gameRound = dashboardData.round;
      this.gameStatus = this.gameStatuses[dashboardData.status - 1];
      this.statusColor = this.statusColors[dashboardData.status - 1];
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
      if (this.gameStatus == "Finished" && this.cdTimer) {
        this.cdTimer.stop();
      }
    });

    this.nextButtonObserver = this.sharedGameService.nextRoundBtn.subscribe(nextRoundBtn => {
      this.activeNextRoundBtn = nextRoundBtn;
      this.gameRound = this.gameRound - 1;
    });
    this.messageObserver = this.sharedGameService.gameMessage.subscribe((gameMessage) => this.gameMessage = gameMessage);
  }

  ngOnDestroy(): void {
    this.dashboardObserver.unsubscribe();
    this.timerObserver.unsubscribe();
    this.nextButtonObserver.unsubscribe();
    this.messageObserver.unsubscribe();
    this.gameService.updateTimer(this.gameId, this.cdTimer.get().tick_count).subscribe(data => {
    })
  }

  nextRound() {
    if (this.gameId) {
      this.onNextRound.emit({gameId: this.gameId});
    }
  }

  setTimer(time: number) {
    if (this.gameStatus == "Finished") {
      this.cdTimer.startTime = time;
      this.cdTimer.start();
      this.cdTimer.stop();
      return;
    }


    this.cdTimer.startTime = time;
    this.cdTimer.start();
  }

  onTick(data: TimeInterface) {
    this.sharedGameService.updateLiveTimer(data.tick_count)
  }
}
