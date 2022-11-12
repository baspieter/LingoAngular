import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/Game';
import { FinalWord } from 'src/app/FinalWord';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterContentInit {
  @Input() game!: Game
  @Input() finalWord!: FinalWord;
  finalWordProgress: any;
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-green-600", "u-bg-orange-500", "u-bg-green-600")
  gameStatus: string = this.gameStatuses[0];
  statusColor: string = this.statusColors[0];

  constructor() { }
  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    if (!this.game || !this.finalWord) return;

    this.gameStatus = this.gameStatuses[this.game.status];
    this.statusColor = this.statusColors[this.game.status];

    const finalWordProgress = this.game?.finalWordProgress;
    if (finalWordProgress) {
      this.finalWordProgress = finalWordProgress.split('');
    }
  }

}
