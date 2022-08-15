import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FinalWord } from 'src/app/FinalWord';
import { Game } from 'src/app/Game';
import { Word } from 'src/app/Word';

@Component({
  selector: 'app-final-word-form',
  templateUrl: './final-word-form.component.html',
  styleUrls: ['./final-word-form.component.scss']
})
export class FinalWordFormComponent implements OnInit {
  finalWordProgress: [] = []
  constructor() { }

  @Input() gameObservable: Observable<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }>| undefined

  ngOnInit(): void {
    this.gameObservable?.forEach(result => this.setGameObject(result))
  }

  private setGameObject(result: {'Game': Game; 'Word': Word; 'Finalword': FinalWord; }): void {
    this.finalWordProgress = result.Game.finalWordProgress
  }
}