import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FinalWord } from 'src/app/FinalWord';
import { Game } from 'src/app/Game';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';

@Component({
  selector: 'app-final-word-form',
  templateUrl: './final-word-form.component.html',
  styleUrls: ['./final-word-form.component.scss']
})
export class FinalWordFormComponent implements OnInit {
  @Output() onGuessFinalWord: EventEmitter<{finalWordGuess: string}> = new EventEmitter();
  guessedFinalWord: string | undefined;
  finalWordProgress!: Array<String>;
  showFinalWordForm: Boolean = false;

  constructor(public sharedGameService: SharedGameService) { }

  ngOnInit(): void {
    this.sharedGameService.dashboardData.subscribe(dashboardData => {;
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
    });

    this.sharedGameService.finalWordForm.subscribe(finalWordForm => {
      this.showFinalWordForm = finalWordForm;
      if (finalWordForm) {
        document.getElementById('finalWordForm')?.classList.remove('u-hidden');
      } else {
        document.getElementById('finalWordForm')?.classList.add('u-hidden');
      }
    });
  }

  onSubmit() {
    if (!this.guessedFinalWord) {
      alert('Please add a name')
      return;
    }
    this.onGuessFinalWord.emit({finalWordGuess: this.guessedFinalWord});
    this.guessedFinalWord = '';
  }
}