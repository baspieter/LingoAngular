import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
  let wordFormComponent: WordFormComponent;
  let wordFormFixture: ComponentFixture<WordFormComponent>;

  let game: Game = { id: 1, round: 1, status: 1, finalWordProgress: 'kerst', timer: 30 };
  let gameWord: GameWord = { id: 1, wordEntries: ['b'], finished: false };
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
    spyOn(gameService, 'updateTimer').and.returnValue(of({ 'Game': game, 'Gameword': gameWord, 'Word': word, 'Finalword': finalWord }));
    gameFixture.detectChanges();
  });

  it('should create', () => {
    expect(gameComponent).toBeTruthy();
  });

  it('should display content of all child components correctly.', fakeAsync(async () => {
    await loadAllComponents(gameComponent)
    gameFixture.detectChanges()
    tick()
    gameFixture.detectChanges()

    expect(gameFixture.nativeElement.querySelector('h1').textContent).toContain('Finalword');
    expect(gameFixture.nativeElement.querySelector('a').textContent).toContain('Games overview');
    expect(gameFixture.nativeElement.querySelector('p').textContent).toContain('How to win: guess the finalword correctly.');
    expect(gameFixture.nativeElement.querySelector('#gameWordTitle').textContent).toContain('Game word');
    expect(gameFixture.nativeElement.querySelector('#gameId').textContent).toContain('Game 1');
    expect(gameFixture.nativeElement.querySelector('#round').textContent).toContain('Round 1/10');
  }));

  it('should display the first letter of gamewords correctly', fakeAsync(async () => {
    await loadAllComponents(gameComponent)
    gameFixture.detectChanges()
    tick()
    gameFixture.detectChanges()
    expect(gameFixture.nativeElement.querySelector('#gameWordTitle').textContent).toContain('Game word');
    expect(gameFixture.nativeElement.querySelector('#letter_0').textContent).toContain(word.name[0]);
  }));

  it('should submit a guess successfully', fakeAsync(async () => {
    wordFormFixture = TestBed.createComponent(WordFormComponent);
    wordFormComponent = wordFormFixture.componentInstance;
    wordFormComponent.game = game;
    wordFormComponent.word = word;
    wordFormComponent.gameWord = gameWord;
    await loadAllComponents(gameComponent)
    gameFixture.detectChanges()
    tick()
    gameFixture.detectChanges()

    expect(gameFixture.nativeElement.querySelector('#gameWordTitle').textContent).toContain('Game word');
    const submitSpy = spyOn(wordFormComponent, "onSubmit").and.callThrough();
    const emitSpy = spyOn(wordFormComponent.onGuessWord, 'emit')

    setInputValue('#guessedWord', 'bussen');

    wordFormComponent.guessedWord = 'bussen';
    const submit = wordFormFixture.debugElement.query(By.css('#save'));
    submit.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({gameWordId: 1, wordGuess: 'bussen'});
  }));

  function returnPromise(gameComponent: GameComponent) {
    return gameComponent.dataLoaded = Promise.resolve(true);
  }
  
  async function loadAllComponents(gameComponent: GameComponent) {
    returnPromise(gameComponent).then((res) => {
      return Promise.resolve(res);
    })
  }

  function setInputValue(selector: string, value: string) {
    gameFixture.detectChanges();
    tick();
  
    let input = gameFixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }
});
