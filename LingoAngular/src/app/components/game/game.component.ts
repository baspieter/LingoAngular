import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';
import { FinalWord } from 'src/app/FinalWord';
import { ActivatedRoute, Router, Navigation, ParamMap } from '@angular/router'; 
import { async } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  dataLoaded: Promise<boolean> | undefined
  game: Game | undefined
  finalWord: FinalWord | undefined
  word: Word | undefined
  gameId: Number | undefined

  constructor(public gameService: GameService, private route: ActivatedRoute, private router: Router) {
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
          console.log(params.finalWord)
          this.gameService.submitFinalWord(params.gameId, params.finalWord).subscribe(result => {
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

  private buildGameObjects(result: { Game: any; Word: any; Finalword: any; }): Promise<Boolean> {
    this.game = result.Game
    this.finalWord = result.Finalword
    this.word = result.Word
    this.dataLoaded = Promise.resolve(true)

    return this.dataLoaded;
  }

  private checkGame(): void {
    console.log('Checking game state')
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
