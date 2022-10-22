import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/Game';
import { GameWord } from 'src/app/GameWord';
import { Word } from 'src/app/Word';
import { FinalWord } from 'src/app/FinalWord';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  dataLoaded: Promise<boolean> | undefined
  game: Game | undefined
  gameWord: GameWord | undefined
  finalWord: FinalWord | undefined
  word: Word | undefined
  gameId: Number | undefined

  constructor(public gameService: GameService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    const idString = this.route.snapshot.paramMap.get('id');
    this.gameId = (idString == null) ? undefined : parseInt(idString);
   }

  ngOnInit() {
    const method = (this.gameId) ? 'getGame' : 'createGame'
    this.syncGame(method);
  }

  public submitFinalWord(result: {gameId: Number, finalWordGuess: String}) {
    this.syncGame('submitFinalWord', { gameId: result.gameId, finalWord: result.finalWordGuess });
  }

  public submitWord(result: {gameId: Number, wordGuess: String}) {
    this.syncGame('submitWord', { gameId: result.gameId, word: result.wordGuess });
  }

  public syncGame(action: String, params: any = {}) {
    new Promise((resolve, reject) => {
      if (!action) return;

      switch(action) { 
        case 'getGame': { 
          if (this.gameId) {
            this.gameService.getGame(this.gameId).subscribe(result => {
              resolve(result)
            })
          }
          break; 
        } 
        case 'createGame': { 
          this.gameService.createGame().subscribe(result => {
            resolve(result);
          });
          break; 
        }
        case 'submitFinalWord': {
          this.gameService.submitFinalWord(params.gameId, params.finalWord).subscribe(result => {
            if (result.Game.status != 2) {
              this.toastr.error('Wrong guess!');
            } 
            resolve(result)
          });
          break;
        }
        case 'submitWord': {
          this.gameService.submitWord(params.gameId, params.word).subscribe(result => {
            resolve(result)
          });
          break;
        }
      }
    }).then((result: any) => {
      this.buildGameObjects(result);
    }).then(() => {
      this.checkGame();
    })
  }

  private buildGameObjects(result: { Game: Game; Gameword: GameWord; Word: Word; Finalword: FinalWord;}): Promise<Boolean> {
    this.game = result.Game
    this.gameWord = result.Gameword
    this.finalWord = result.Finalword
    this.word = result.Word
    this.dataLoaded = Promise.resolve(true)

    return this.dataLoaded;
  }

  private checkGame(): void {
    if (!this.game) {
      alert('Game data not found.')
      this.router.navigate(['/gameList']);
      return;
    }

    if (this.game.status == 2) {
      alert('Game finished')
      this.router.navigate(['/gameList']);
      return;
    }
  }
}
