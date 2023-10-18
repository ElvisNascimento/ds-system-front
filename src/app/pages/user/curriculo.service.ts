import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl = 'http://localhost:3000/curriculos';

  private curriculoSelecionado: any = null;

  constructor(private http: HttpClient) { }

  getCurriculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registerCurriculo(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados)
      .pipe(
        catchError(error => {
          console.error('Erro na requisição:', error);
          return throwError(() => new Error(error));
        })
      );
  }
  getQuantidadeCurriculos(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((curriculos: string | any[]) => curriculos.length)
    );
  }

  setCurriculoSelecionado(curriculo: any) {
    this.curriculoSelecionado = curriculo;
  }

  getCurriculoSelecionado() {
    return this.curriculoSelecionado;
  }
}
