import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  finalWordFormDisabled: string | boolean = false;

  constructor(public sharedGameService: SharedGameService) { }

  ngOnInit(): void {
    this.sharedGameService.dashboardData.subscribe(dashboardData => {;
      this.finalWordProgress = dashboardData.finalWordProgress.split('');
      this.finalWordFormDisabled = dashboardData.status == 3;
    });
  }

  onSubmit() {
    if (!this.guessedFinalWord) {
      alert('Please enter a word')
      return;
    }
    const finalWordGuess = this.guessedFinalWord.toLowerCase();
    this.onGuessFinalWord.emit({finalWordGuess: finalWordGuess});
    this.guessedFinalWord = '';
  }
}