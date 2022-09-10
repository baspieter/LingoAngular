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

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

}
