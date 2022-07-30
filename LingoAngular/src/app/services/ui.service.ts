import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddWord: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddWord = !this.showAddWord;
    this.subject.next(this.showAddWord);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}