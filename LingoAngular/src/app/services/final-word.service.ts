import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalWord } from '../FinalWord';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class FinalWordService {
  private apiUrl = 'https://localhost:7237/finalWords';

  constructor(private http: HttpClient) { }

  getFinalWords(): Observable<FinalWord[]> {
    return this.http.get<FinalWord[]>(this.apiUrl);
  }
}

