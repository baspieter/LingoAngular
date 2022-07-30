import { Component, OnInit } from '@angular/core';
import { FinalWordService } from '../../../services/final-word.service';
import { FinalWord } from '../../../FinalWord';

@Component({
  selector: 'app-final-word',
  templateUrl: './final-word.component.html',
  styleUrls: ['./final-word.component.scss']
})
export class FinalWordComponent implements OnInit {
  finalWords: FinalWord[] = [];

  constructor(public finalWordService: FinalWordService) { }

  ngOnInit(): void {
    this.finalWordService.getFinalWords().subscribe(finalWords => this.finalWords = finalWords);
  }

  addFinalWord(finalWord: FinalWord) {
    this.finalWordService.addFinalWord(finalWord).subscribe((finalWord) => this.finalWords.push(finalWord));
  }
}
