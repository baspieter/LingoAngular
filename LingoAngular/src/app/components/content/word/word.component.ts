import { Component, OnInit } from '@angular/core';
import { WordService } from '../../../services/word.service';
import { Word } from '../../../Word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  words: Word[] = [];

  constructor(public wordService: WordService) { }

  ngOnInit(): void {
    this.wordService.getWords().subscribe(words => this.words = words);
  }
}

