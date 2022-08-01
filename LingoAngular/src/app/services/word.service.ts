import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../Word';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'https://localhost:7237/words';

  constructor(private http: HttpClient) { }

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(this.apiUrl);
  }

  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>(this.apiUrl, word, httpOptions);
  }

  deleteWord(word: Word): Observable<Word> {
    const url = `${this.apiUrl}/${word.id}`;
    return this.http.delete<Word>(url);
  }
}

