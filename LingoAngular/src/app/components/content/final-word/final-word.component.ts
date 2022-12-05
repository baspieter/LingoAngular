import { Component, OnInit } from '@angular/core';
import { FinalWordService } from '../../../services/final-word.service';
import { FinalWord } from '../../../FinalWord';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-final-word',
  templateUrl: './final-word.component.html',
  styleUrls: ['./final-word.component.scss']
})
export class FinalWordComponent implements OnInit {
  finalWords: FinalWord[] = [];

  constructor(public finalWordService: FinalWordService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.finalWordService.getFinalWords().subscribe(finalWords => this.finalWords = finalWords);
  }

  addFinalWord(finalWord: FinalWord) {
    finalWord.name = finalWord.name.toLowerCase();
    this.finalWordService.addFinalWord(finalWord).subscribe((finalWord) => this.finalWords.push(finalWord));

    this.toastr.success('Finalword added');
  }

  removeFinalWord(finalWord: FinalWord) {
    if(confirm("Are you sure?")) {
      this.finalWordService
      .deleteFinalWord(finalWord)
      .subscribe(
        () => (this.finalWords = this.finalWords.filter((t) => t.id !== finalWord.id))
      );

      this.toastr.success('Finalword removed');
    }
  }
}
