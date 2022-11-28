import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { Game } from 'src/app/Game';
import { GameWord } from 'src/app/GameWord';
import { Word } from 'src/app/Word';
import { FinalWord } from 'src/app/FinalWord';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  dataLoaded: Promise<boolean> | undefined
  game!: Game
  gameWord!: GameWord
  finalWord!: FinalWord
  word!: Word
  gameId: Number | undefined
  dashboardData: Object | undefined

  constructor(public gameService: GameService, public sharedGameService: SharedGameService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private location: Location) {
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

  public submitWord(result: {gameWordId: Number, wordGuess: String}) {
    this.syncGame('submitWord', { gameWordId: result.gameWordId, word: result.wordGuess });
  }

  public nextRound(result: { gameId: Number }) {
    this.syncGame('nextRound', { gameId: result.gameId });
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
          this.gameService.submitWord(params.gameWordId, params.word).subscribe(result => {
            resolve(result)
          });
          break;
        }
        case 'nextRound': {
          this.gameService.nextRound(params.gameId).subscribe(result => {
            resolve(result)
          });
          break;
        }
      }
    }).then((result: any) => {
      if (!result.Game || !result.Gameword || !result.Finalword || !result.Word) {
        this.dataLoaded = Promise.resolve(false);
      } else {
        this.game = result.Game
        this.gameWord = result.Gameword
        this.finalWord = result.Finalword
        this.word = result.Word
        console.log(result.Game.round )
        this.sharedGameService.updateDashboard({ gameId: result.Game.id, round: (result.Game.round + 1), status: (result.Game.status + 1), finalWordProgress: result.Game.finalWordProgress })
        this.dataLoaded = Promise.resolve(true);
        this.location.replaceState(`/game/${this.game.id}`);
      }
      return this.dataLoaded;
    }).then(() => {
      if (!this.dataLoaded) {
        alert('Game data not found.')
        this.router.navigate(['/gameList']);
        return;
      }

      if (this.game.status == 2) {
        alert('Game finished')
        this.router.navigate(['/gameList']);
        return;
      }
    })
  }
}
