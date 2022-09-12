import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../Game';
import { Word } from '../Word';
import { FinalWord } from '../FinalWord';

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

  createGame(): Observable<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }> {
    return this.http.post<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }>(this.apiUrl, httpOptions);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  submitFinalWord(gameId: Number, finalWord: String): Observable<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}/submitFinalWord/${finalWord}`;
    return this.http.get<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions)
  }

  getGame(gameId: Number): Observable<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }> {
    const url = `${this.apiUrl}/${gameId}`;
    return this.http.get<{ 'Game': Game; 'Word': Word; 'Finalword': FinalWord; }>(url, httpOptions);
  }
}