import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SharedGameService } from 'src/app/services/shared-game.service';
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
  defaultGameMessage: String = "<p'>Game results are shown here.</p>"
  liveTimer: number = 0;
  savedTimer: number = 0;

  constructor(public gameService: GameService, public sharedGameService: SharedGameService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private location: Location) {
    const idString = this.route.snapshot.paramMap.get('id');
    this.gameId = (idString == null) ? undefined : parseInt(idString);
   }

  ngOnInit() {
    const method = (this.gameId) ? 'getGame' : 'createGame';
    this.setTimerVariables();
    this.syncGame(method);
  }

  public submitFinalWord(result: { finalWordGuess: String }) {
    this.syncGame('submitFinalWord', { gameId: this.gameId, finalWord: result.finalWordGuess });
  }

  public submitWord(result: { gameWordId: Number, wordGuess: String }) {
    this.syncGame('submitWord', { gameWordId: result.gameWordId, word: result.wordGuess });
  }

  public nextRound(result: { gameId: Number }) {
    this.syncGame('nextRound', { gameId: result.gameId });
  }

  public syncGame(action: String, params: any = {}) {
    if (action != 'submitFinalWord' || action != 'submitWord') this.sharedGameService.updateGameMessage(this.defaultGameMessage);
    
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
          if (!this.gameId) return;
          this.gameService.submitFinalWord(this.gameId, params.finalWord, this.liveTimer).subscribe(result => {
            resolve(result)
          });
          break;
        }
        case 'submitWord': {
          this.gameService.submitWord(params.gameWordId, params.word, this.liveTimer).subscribe(result => {
            resolve(result)
          });
          break;
        }
        case 'nextRound': {
          this.gameService.nextRound(params.gameId, this.liveTimer).subscribe(result => {
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
        this.sharedGameService.updateDashboard({ gameId: result.Game.id, round: result.Game.round + 1, status: (result.Game.status + 1), finalWordProgress: result.Game.finalWordProgress, timer: this.game.timer })
        this.sharedGameService.updateNextRoundBtn(false);
        if (action == 'getGame' || action == 'createGame') this.sharedGameService.updateSavedTimer(this.game.timer);
        this.gameId = this.game.id;
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
        if (this.game.finalWordProgress == this.finalWord.name) {
          this.sharedGameService.updateGameMessage("<p class='u-text-green-600'>Congrats, game successfull completed!</p>");
        } else {
          this.sharedGameService.updateGameMessage("<p class='u-text-red-700'>Oops, you ran out of rounds, game is finished.</p>");
        }
        this.sharedGameService.updateNextRoundBtn(false);
        return;
      }

      if (this.game.status != 2 && action == 'submitFinalWord') {
        this.sharedGameService.updateGameMessage("<p class='u-text-red-700'>Oops, wrong guess!</p>");
      }
    })
  }

  setTimerVariables() {
    this.sharedGameService.liveTimer.subscribe(timer => this.liveTimer = timer );
    this.sharedGameService.savedTimer.subscribe(timer => this.savedTimer = timer );
  }
}
