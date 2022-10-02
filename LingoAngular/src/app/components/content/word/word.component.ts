import { Component, OnInit } from '@angular/core';
import { WordService } from '../../../services/word.service';
import { Word } from '../../../Word';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  words: Word[] = [];

  constructor(public wordService: WordService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.wordService.getWords().subscribe(words => this.words = words);
  }

  addWord(word: Word) {
    this.wordService.addWord(word).subscribe((word) => this.words.push(word));
    
    this.toastr.success('Word added');
  }

  removeWord(word: Word) {
    if(confirm("Are you sure?")) {
      this.wordService
        .deleteWord(word)
        .subscribe(
          () => (this.words = this.words.filter((t) => t.id !== word.id))
        );

        this.toastr.success('Word removed');
    }
  }
}

