import { Component, OnInit } from '@angular/core';
import { Game } from '../../Game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  gameStatuses: Array<string> = new Array("Active", "Paused", "Finished");
  statusColors: Array<string> = new Array("u-bg-orange-500", "u-bg-orange-500", "u-bg-green-600")

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  gameStatus(game: Game) {
    return this.gameStatuses[game.status];
  }

  statusColor(game: Game) {
    return this.statusColors[game.status];
  }
  
}
