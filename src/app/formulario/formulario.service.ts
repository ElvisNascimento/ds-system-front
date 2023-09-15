import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = 'http://localhost:3000/curriculos'; // Substitua pela URL correta

  constructor(private http: HttpClient) { }

  salvarDados(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}
