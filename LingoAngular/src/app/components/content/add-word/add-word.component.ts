import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Word } from '../../../Word';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @Output() onAddWord: EventEmitter<Word> = new EventEmitter();
  name: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if(!this.name) {
      alert('Please add a name')
      return;
    }

    if(this.name?.length != 6) {
      alert('Name should be 6 characters.')
      return;
    }

    const newWord = { name: this.name }

    this.onAddWord.emit(newWord)    

    this.name = '';
  }

}
