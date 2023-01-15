import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { ContentModule } from 'src/app/content.module';
import { FinalWord } from 'src/app/FinalWord';
import { Game } from 'src/app/Game';
import { GameModule } from 'src/app/game.module';
import { GameWord } from 'src/app/GameWord';
import { GameService } from 'src/app/services/game.service';
import { Word } from 'src/app/Word';
import { AddFinalWordComponent } from '../content/add-final-word/add-final-word.component';
import { FinalWordComponent } from '../content/final-word/final-word.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinalWordFormComponent } from './final-word-form/final-word-form.component';

import { GameComponent } from './game.component';
import { WordFormComponent } from './word-form/word-form.component';

describe('GameComponent', () => {
  let gameComponent: GameComponent;
  let gameFixture: ComponentFixture<GameComponent>;
  let gameService: GameService;

  let game: Game = { round: 1, status: 1, finalWordProgress: 'kerst', timer: 30 };
  let gameWord: GameWord= { wordProgress: ['d', 'd'], finished: false };
  let word: Word = { name: 'bussen' };
  let finalWord: FinalWord = { name: 'kerstmisfeest' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent, FinalWordFormComponent, DashboardComponent, WordFormComponent ],
      imports: [ ToastrModule.forRoot() ]
    })
    .compileComponents();

    gameFixture = TestBed.createComponent(GameComponent);
    gameComponent = gameFixture.componentInstance;
    gameService = TestBed.inject(GameService);

    spyOn(gameService, 'createGame').and.returnValue(of({ 'Game': game, 'Gameword': gameWord, 'Word': word, 'Finalword': finalWord }));
    gameFixture.detectChanges();
  });

  fit('should display titles of all child components', waitForAsync(() => {
    gameFixture.detectChanges();
    expect(gameFixture.nativeElement.querySelector('a').textContent).toContain('Games overview'); // Works
    expect(gameFixture.nativeElement.querySelector('p').textContent).toContain('How to win: guess the finalword correctly.'); // Works
    expect(gameFixture.nativeElement.querySelector('#wordheader').textContent).toContain('Game word.'); // Failed: Cannot read properties of null (reading 'textContent')
  }));

  it('should create', () => {
    expect(gameComponent).toBeTruthy();
  });

  it('should show all content', () => {
    gameFixture.detectChanges();
    expect(gameFixture.nativeElement.querySelector('a').textContent).toContain('Games overview');
    expect(gameFixture.nativeElement.querySelector('p').textContent).toContain('How to win: guess the finalword correctly.');
    gameFixture.detectChanges();
  });

});