import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';
import { FinalWord } from 'src/app/FinalWord';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  gameObservable: Observable<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }> | undefined
  // game: Game | undefined
  // finalWord: FinalWord | undefined
  // word: Word = { name: "" }
  // finalWordName: String = "";

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.createGame();
  }

  createGame(): void {
    this.gameObservable = this.gameService.createGame();
    // this.gameService.createGame().subscribe(result => this.setGameObjects(result));
  }

  // setGameObjects(result: { 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }): void {
  //   this.game = result.Game;
  //   this.finalWord = result.Finalword;
  //   this.word = result.Word;
  //   this.finalWordName = result.Finalword.name;
  // }
}
