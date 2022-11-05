import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { GameWord } from 'src/app/GameWord';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { toastPayload } from 'src/app/ToastPayload';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements AfterViewInit {
  @Output() onGuessWord: EventEmitter<{ gameWordId: number, wordGuess: string }> = new EventEmitter();
  @Output() onNextRound: EventEmitter<{ gameId: number }> = new EventEmitter();
  @Input() game: Game | undefined
  @Input() gameWord: GameWord | undefined
  @Input() word: Word | undefined

  gameFinished: Boolean = false;
  guessedWord: string | undefined;
  wordArray: Array<String> = new Array(5);
  letterArray: Array<Number> = new Array(6);
  wordProgress!: Array<String>;
  correctWord!: String;
  toast!: toastPayload;

  constructor(private cs: CommonService) {}

  ngAfterViewInit(): void {
    if (!this.game || !this.gameWord || !this.word) return;
  
    this.correctWord = this.word.name;
    this.wordProgress = this.gameWord.wordProgress;
    this.gameFinished = (this.gameWord?.finished || this.gameWord?.wordProgress.length == 5) ? true : false
    console.log(this.wordProgress)
    console.log(this.correctWord)
    console.log(this.gameWord);
    console.log(this.word)
    this.setProgress();

    if (this.gameFinished) {
      this.finishRound();
      return;
    }

    // Pre fill the next word element.
    if (this.wordProgress.length < 5 && this.wordProgress.length > 0) this.prefillNextWord();

    document.getElementById('guessedWord')?.focus();
  }

  nextRound() {
    if (this.game && this.game?.id) {
      this.onNextRound.emit({gameId: this.game.id});
    }
  }

  onSubmit() {
    if (!this.game) {
      alert('Something went wrong.')
      return;
    }

    if (this.gameWord?.finished) {
      alert('Round has ended.')
      return;
    }

    if (!this.guessedWord) {
      alert('Please add a name')
      return;
    }

    if (this.guessedWord.length != 6) {
      alert('Word should be 6 characters long.')
      return;
    }

    if (this.gameWord?.id) {
      this.onGuessWord.emit({gameWordId: this.gameWord.id, wordGuess: this.guessedWord});
      this.guessedWord = '';
    }
  }

  private setProgress() {
    for (let [index, word] of this.wordProgress.entries()) {
      // Set all green letters per word
      const wordStatus: Map<Number, Number> = this.setGreenLetters(word);
      // Set all orange letters per word
      const finalStatus: Map<Number, Number> = this.setOrangeLetters(wordStatus, word)
      // Define the current word element so we can style it
      const wordElement = document.getElementById(`word_${index}`)
      
      if (!wordElement || !finalStatus) return;

      // Submit all letter statuses per word.
      this.submitWordStatus(finalStatus, wordElement, word);
    }
  }

  private prefillNextWord() {
    const nextWordElement = document.getElementById(`word_${this.wordProgress.length}`)
    if (!nextWordElement) return;

    const bestguessedWord: String = this.setBestWordGuess(this.correctWord, this.wordProgress[this.wordProgress.length - 1]);
    const bestguessedWordMap: Map<Number, Number> = this.convertWordToMap(bestguessedWord)
    this.createNextWord(bestguessedWordMap, nextWordElement, bestguessedWord);
  }

  private setBestWordGuess(originalWord: String, word: String) {
    let bestWordCount: Number = 0;
    let bestWord: String = word;

    for (let [index, word] of this.wordProgress.entries()) {
      let correct_count = 0

      for (let i = 0; i < 6; i++) {
        if (word[i] == originalWord[i]) {
          correct_count++
        }
      }
      if (correct_count >= bestWordCount) {
        bestWordCount = correct_count
        bestWord = word;
      }
    }

    return bestWord;
  }

  private convertWordToMap(word: String) {
    let map: Map<Number, Number> = new Map();

    for (let i = 0; i < 6; i++) {
      (this.correctWord[i] == word[i]) ? map.set(i, 1) : map.set(i, 0);
    }

    return map;
  }

  private createNextWord(wordMap: Map<Number, Number>, element: HTMLElement, word: String) {

    const lettersElement = element.children;
    for (let i = 0; i < 6; i++) {
      if (wordMap.get(i) == 1) {
        const letterElement = lettersElement[i].children[0];
        letterElement.innerHTML = word[i];
      }
    }
  }

  private setGreenLetters(word: String) {
    const wordStatus = new Map();

    // Compare each letter and position with originalWord.
    // Whenever there is a match, the wordStatus map will be updated.
    for (let i = 0; i < 6; i++) {
      const colorNumber: Number = word[i] == this.correctWord[i] ? 1 : 0  
      wordStatus.set(i, colorNumber);
    }

    return wordStatus;
  }

  private setOrangeLetters(wordStatus: Map<Number, Number>, word: String) {
    const orangeChars = new Array<String>

    for (let i = 0; i < 6; i++) {
      if (this.correctWord.includes(word[i])) {
        // Checks how many times letter exists in originalWord
        const originalLetterCount: Number = (this.correctWord.split(word[i]).length - 1)
        // Check how many times we already changed this letter to orange.
        const savedOrangeCharsCount: Number = this.getOccurrenceInArray(orangeChars, word[i])

        // First condition checks if the wrong placed letter is already made green somewhere else.
        // Second condition checks if letter is made orange earlier and how many times.
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

    // Iteration counts how many times this letter has been made orange or green.
    for (let i = 0; i < 6; i++) {
      if (word[i] == letter) {
        if (wordStatus.get(i) == 1) {
          greenCount++
        } else if (wordStatus.get(i) == 2) {
          orangeCount++;
        }
      }
    }

    // Returns true whenever a letter can be orange.
    // This is only the case whenever the letter is more times present than it being green + orange.
    return wordLetterCount > (greenCount + orangeCount)
  }

  // Function will give the correct color to letterElement.
  // Based on the data within finalStatus map.
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

  // Function looks up how many times a value appears in a array.
  private getOccurrenceInArray(array: Array<String>, value: String) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

  private finishRound() {
    document.getElementById('nextRoundBtn')?.classList.remove('u-hidden');

    if (this.wordProgress[this.wordProgress.length - 1] == this.correctWord) {
      this.toast = {
        title: 'Yay, correct word!',
        message: `You guessed: ${this.correctWord}. Hit the continue button to start the next round.`,
        type: 'success',
        ic: { timeOut: 20000000, closeButton: true, } as IndividualConfig,
      };
    } else {
      this.toast = {
        title: 'Oops ran out of guesses! :(',
        message: `The correct word is: ${this.correctWord}. Hit the continue button to start the next round.`,
        type: 'error',
        ic: { timeOut: 20000000, closeButton: true, } as IndividualConfig,
      };
    }
    this.cs.showToast(this.toast);
  }
}