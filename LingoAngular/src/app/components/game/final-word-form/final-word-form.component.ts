import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FinalWord } from 'src/app/FinalWord';
import { Game } from 'src/app/Game';

@Component({
  selector: 'app-final-word-form',
  templateUrl: './final-word-form.component.html',
  styleUrls: ['./final-word-form.component.scss']
})
export class FinalWordFormComponent implements OnInit {
  @Output() onGuessFinalWord: EventEmitter<{gameId: number, finalWordGuess: string}> = new EventEmitter();
  finalWordProgress: any;
  guessedFinalWord: string | undefined;

  constructor() { }

  @Input() game: Game | undefined
  @Input() finalWord: FinalWord | undefined

  ngOnInit(): void {
    const finalWordProgress = this.game?.finalWordProgress;
    if (finalWordProgress) {
      this.finalWordProgress = finalWordProgress.split('');
    }
  }

  onSubmit() {
    if (!this.game) {
      alert('Something went wrong.')
      return;
    }

    if (!this.guessedFinalWord) {
      alert('Please add a name')
      return;
    }
    if (this.game.id) {
      this.onGuessFinalWord.emit({gameId: this.game.id, finalWordGuess: this.guessedFinalWord});
      this.guessedFinalWord = '';
    }
  }
}