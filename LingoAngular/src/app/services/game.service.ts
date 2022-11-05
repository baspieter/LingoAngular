import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  createGame(): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    return this.http.post<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(this.apiUrl, httpOptions);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  submitFinalWord(gameId: Number, finalWord: String): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}/submitFinalWord/${finalWord}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  submitWord(gameWordId: Number, word: String): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    console.log('game servcie word:', word)
    const url = `${this.apiUrl}/${gameWordId}/submitWord/${word}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  getGame(gameId: Number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions);
  }

  nextRound(gameId: Number): Observable<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}/nextRound`;
    return this.http.get<{ 'Game': Game; 'Gameword': GameWord; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }
}