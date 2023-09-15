import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl = 'http://localhost:3000/curriculos'; // Substitua pela URL correta

  constructor(private http: HttpClient) { }

  getCurriculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
