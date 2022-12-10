import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Output() onNextRound: EventEmitter<{ gameId: number }> = new EventEmitter();
  @ViewChild( 'timer', { static: false } ) cdTimer!: CdTimerComponent;

  dataLoaded: Promise<boolean> | undefined
  finalWordProgress!: Array<String>;
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-green-600", "u-bg-orange-500", "u-bg-green-600")
  gameStatus: string = this.gameStatuses[0];
  statusColor: string = this.statusColors[0];
  gameRound: number = 0;
  gameId: any = undefined;
  savedTimer: number = 0;
  activeNextRoundBtn: Boolean = false;
  gameMessage: String = "<p class='u-text-xs'>Game results are shown here.</p>";
  testen: String = "12";

  constructor(public gameService: GameService, public sharedGameService: SharedGameService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.sharedGameService.dashboardData.subscribe(dashboardData => {
      this.gameId = dashboardData.gameId;
      this.gameRound = dashboardData.round;
      this.gameStatus = this.gameStatuses[dashboardData.status - 1];
      this.statusColor = this.statusColors[dashboardData.status - 1];
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
    });

    this.sharedGameService.savedTimer.subscribe((timer) => {
      this.savedTimer = timer;
    });

    this.sharedGameService.nextRoundBtn.subscribe(nextRoundBtn => {
      this.activeNextRoundBtn = nextRoundBtn;
      this.gameRound = this.gameRound - 1;
    });
    this.sharedGameService.gameMessage.subscribe((gameMessage) => this.gameMessage = gameMessage);
    this.dataLoaded = Promise.resolve(true);

    this.setTimer()
  }

  ngOnDestroy(): void {
    this.gameService.updateTimer(this.gameId, this.cdTimer.get().tick_count).subscribe(data => {
    })
  }

  nextRound() {
    if (this.gameId) {
      this.onNextRound.emit({gameId: this.gameId});
    }
  }

  setTimer() {
    this.cdTimer.startTime = this.savedTimer;
    this.cdTimer.stop();
    // console.log(this.gameId == undefined || time == undefined)
    // if (this.gameId == undefined || time == undefined) return;

    // if (this.gameStatus == "Finished") {
    //   console.log(time)
    //   this.cdTimer.startTime = time;
    //   this.cdTimer.stop();
    //   return;
    // }

    // this.cdTimer.startTime = time; 
    // this.cdTimer.start();
  }

  onTick(data: TimeInterface) {
    this.sharedGameService.updateLiveTimer(data.tick_count)
  }
}
