import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { GameWord } from 'src/app/GameWord';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';
import { CommonService } from 'src/app/services/common.service';
import { toastPayload } from 'src/app/ToastPayload';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements AfterViewInit {
  @Output() onGuessWord: EventEmitter<{ gameWordId: number, wordGuess: string }> = new EventEmitter();
  @Input() game!: Game
  @Input() gameWord!: GameWord
  @Input() word!: Word

  gameFinished: Boolean = false;
  roundFinished: Boolean = false;
  guessedWord: string | undefined;
  wordArray: Array<String> = new Array(5);
  letterArray: Array<Number> = new Array(6);
  wordProgress!: Array<String>;
  correctWord!: String;
  toast!: toastPayload;
  wordFormDisabled: string | boolean = false;

  constructor(private cs: CommonService, public sharedGameService: SharedGameService) {}

  ngOnInit(): void {
    if (!this.game || !this.gameWord || !this.word) return;
  
    this.correctWord = this.word.name;
    this.wordProgress = this.gameWord.wordProgress;
    this.roundFinished = (this.gameWord?.finished || this.gameWord?.wordProgress.length == 5) ? true : false
    this.gameFinished = this.game.status == 2;
  }

  ngAfterViewInit(): void {
    if (this.gameFinished || this.roundFinished) this.wordFormDisabled = "true";

    if (this.gameFinished) {
      return;
    }

    this.setProgress();

    if (this.roundFinished) {
      this.finishRound();
      return;
    }

    // Pre fill first letter.
    this.prefillFirstLetter();
    // Pre fill the next word element.
    if (this.wordProgress.length < 5 && this.wordProgress.length > 0) this.prefillNextWord();

    document.getElementById('guessedWord')?.focus();
  }

  ngOnDestroy() {
    this.cs.clearToast();
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
      alert('Please enter a name')
      return;
    }

    if (this.guessedWord.length != 6) {
      alert('Word should be 6 characters long.')
      return;
    }

    if (this.gameWord?.id) {
      const guessedWord = this.guessedWord.toLowerCase();
      this.onGuessWord.emit({gameWordId: this.gameWord.id, wordGuess: guessedWord});
      this.guessedWord = '';
    }
  }

  private setProgress() {
    if (this.wordProgress.length == 0) {
      
    }
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
    this.sharedGameService.updateNextRoundBtn(true);
    let message = "<p class='u-text-gray-400'>Game results are shown here.</p>";
    if (this.wordProgress[this.wordProgress.length - 1] == this.correctWord) {
      message = `<p class="u-text-green-600">Yay, correct word! You guessed <b>${this.correctWord}</b> right! Continue to next round.</p>`
    } else {
      message = `<p class="u-text-red-700">Oops, ran out of guesses. The correct word is <b>${this.correctWord}</b></p>`;
    }
    this.sharedGameService.updateGameMessage(message);
  }

  private prefillFirstLetter() {
    const wordElement = document.getElementById(`word_${this.wordProgress.length}`)
    if (wordElement) {
      wordElement.children[0].children[0].innerHTML = this.correctWord[0];
    }
  }
}