import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SharedGameService } from 'src/app/services/shared-dashboard.service';
import { Observable } from 'rxjs';
import { Game } from '../Game';
import { Word } from '../Word';
import { FinalWord } from '../FinalWord';
import { GameWord } from '../GameWord';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private apiUrl = 'https://localhost:7237/games';

  constructor(public sharedGameService: SharedGameService, private http: HttpClient) { }

  createGame(): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    return this.http.post<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(this.apiUrl, httpOptions);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  submitFinalWord(gameId: Number, finalWord: String, timer: number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}/submitFinalWord/${finalWord}/${timer}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  submitWord(gameWordId: Number, word: String, timer: number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameWordId}/submitWord/${word}/${timer}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  getGame(gameId: Number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions);
  }

  nextRound(gameId: Number, timer: number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}/nextRound/${timer}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  updateTimer(gameId: Number, currentTimer: number) {
    const url = `${this.apiUrl}/${gameId}/updateTimer/${currentTimer}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }
}