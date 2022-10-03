import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { GameWord } from 'src/app/GameWord';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements AfterViewInit {
  @Output() onGuessWord: EventEmitter<{ gameId: number, wordGuess: string }> = new EventEmitter();
  guessedWord: string | undefined;
  wordArray: Array<String> = new Array(5);
  letterArray: Array<Number> = new Array(6);
  wordProgress!: Array<String>;
  wordLetterProgress!: Array<Number>;
  @Input() game: Game | undefined
  @Input() gameWord: GameWord | undefined
  @Input() word: Word | undefined

  constructor() {
   }
  ngAfterViewInit(): void {
    if (!this.game || !this.gameWord) return;

    this.wordProgress = this.gameWord.wordProgress;
    this.wordLetterProgress = this.gameWord.wordLetterProgress;

    this.setProgress();
  }

  setProgress() {
    const originalWord = this.word?.name;
    for (let [index, word] of this.wordProgress.entries()) {
      const lettersElement = document.getElementById(`word_${index}`)?.children
      for (let i = 0; i < 6; i++) {
        if (originalWord && lettersElement) {
          const letterElement = lettersElement[i].children[0];
          if (word[i] == originalWord[i]) {
            letterElement.classList.remove('u-bg-white')
            letterElement.classList.add('u-bg-lime-500')
          } else if (originalWord.includes(word[i])) {
            letterElement.classList.remove('u-bg-white')
            letterElement.classList.add('u-bg-orange-300')
          }
          letterElement.innerHTML = word[i];
        }
      }
    }

    if (this.wordProgress.length + 1 < 6){
      console.log('Show progress so far WIP')
    }
  }

  onSubmit() {
    if (!this.game) {
      alert('Something went wrong.')
      return;
    }

    if (!this.guessedWord) {
      alert('Please add a name')
      return;
    }

    if (this.guessedWord.length != 6)
    {
      alert('Word should be 6 characters long.')
      return;
    }

    if (this.game.id) {
      this.onGuessWord.emit({gameId: this.game.id, wordGuess: this.guessedWord});
      this.guessedWord = '';
    }
  }
}
