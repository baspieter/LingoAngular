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
    if (!originalWord) return;

    for (let [index, word] of this.wordProgress.entries()) {
      const wordStatus: Map<Number, Number> = this.setGreenLetters(word, originalWord);
      const finalStatus: Map<Number, Number> = this.setOrangeLetters(wordStatus, word, originalWord)
      const wordElement = document.getElementById(`word_${index}`)
      
      if (!wordElement || !finalStatus) return;

      this.submitWordStatus(finalStatus, wordElement, word);
    }
  }

  private setGreenLetters(word: String, originalWord: String) {
    const wordStatus = new Map();
    for (let i = 0; i < 6; i++) {
      const colorNumber: Number = word[i] == originalWord[i] ? 1 : 0  
      wordStatus.set(i, colorNumber);
    }

    return wordStatus;
  }

  private setOrangeLetters(wordStatus: Map<Number, Number>, word: String, originalWord: String) {
    const orangeChars = new Array<String>

    for (let i = 0; i < 6; i++) {
      if (originalWord.includes(word[i])) {
        // Checks how many times letter exists in originalWord
        const originalLetterCount: Number = (originalWord.split(word[i]).length - 1)
        // Check how many times we already changed this letter to orange.
        const savedOrangeCharsCount: Number = this.getOccurrenceInArray(orangeChars, word[i])

        
        // First condition checks if letter is made orange earlier or how many times.
        // Second condition checks if the wrong placed letter is already made green somewhere else.
        
        if (this.checkGreenMatches(wordStatus, word[i], originalLetterCount, word) && savedOrangeCharsCount < originalLetterCount) {
          if (wordStatus.get(i) != 1) {
            wordStatus.set(i, 2);
            orangeChars.push(word[i]);
          }
        }
      }
    }

    return wordStatus;
  }

  private checkGreenMatches(wordStatus: Map<Number, Number>, letter: String, wordLetterCount: Number, word: String) {
    let greenCount = 0;
    let orangeCount = 0;
    for (let i = 0; i < 6; i++) {
      if (word[i] == letter) {
        if (wordStatus.get(i) == 1) {
          greenCount++
        } else if (wordStatus.get(i) == 2) {
          orangeCount++;
        }
      }
    }
    return wordLetterCount > (greenCount + orangeCount)
  }

  private submitWordStatus(finalStatus: Map<Number, Number>, wordElement: HTMLElement, word: String) {
    const lettersElement = wordElement.children;

    for (let i = 0; i < 6; i++) {
      const letterElement = lettersElement[i].children[0];
      letterElement.innerHTML = word[i];
      if (finalStatus.get(i) == 1) {
        letterElement.classList.add('u-bg-lime-500');
      } else if (finalStatus.get(i) == 2) {
        letterElement.classList.add('u-bg-orange-300');
      }
    }
  }

  private getOccurrenceInArray(array: Array<String>, value: String) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
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