import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FinalWord } from '../../../FinalWord';

@Component({
  selector: 'app-add-final-word',
  templateUrl: './add-final-word.component.html',
  styleUrls: ['./add-final-word.component.scss']
})
export class AddFinalWordComponent implements OnInit {
  @Output() onAddFinalWord: EventEmitter<FinalWord> = new EventEmitter();
  name: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.name) {
      alert('Please add a name')
      return;
    }

    if(this.name?.length < 10) {
      alert('Final name should be atleast 10 characters')
      return;
    }

    const newFinalWord = { name: this.name }

    this.onAddFinalWord.emit(newFinalWord)    

    this.name = '';
  }

}
