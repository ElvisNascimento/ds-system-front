import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurriculosService {
  private apiUrl = 'http://localhost:3000/curriculos/';

  private curriculoSelecionado: any = null;

  curriculoId: any = 0;

  constructor(private http: HttpClient) { }

  ngOnChange() {
    this.updateCurriculo;
  }

  getCurriculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCurriculosByEmail(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + userEmail);
  }

  registerCurriculo(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados).pipe(
      catchError((error) => {
        console.error('Erro na requisição:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getQuantidadeCurriculos(): Observable<number> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((curriculos: string | any[]) => curriculos.length));
  }

  setCurriculoSelecionado(curriculoId: any) {
    return this.curriculoId = curriculoId;
  }

  getCurriculoSelecionado() {
    console.log(this.curriculoSelecionado);

    return this.curriculoSelecionado;
  }

  updateCurriculo(curriculoId: any, status: string): Observable<any> {

    return this.http.patch(this.apiUrl + curriculoId, { status });
  }
}
