// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }

  public username: string = '';

  login(credentials: any) {
    this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
      next:
        (response: any) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          const decodedToken: any = jwt_decode(token);
          this.username = decodedToken.name;

          if (decodedToken.admin) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
        }, error:
        (error: any) => {
          window.alert(error.error.message);
        }
    });
  }


  private loggedInUserSubject = new BehaviorSubject<string>('');

  loggedInUser$ = this.loggedInUserSubject.asObservable();

  setLoggedInUser(username: string) {
    return this.username;
  }

  register(newUserCredentials: any): void {
    this.http.post(`${this.apiUrl}/users`, newUserCredentials)
      .pipe(
        catchError(error => {
          console.error('Erro na requisição:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('Usuário registrado com sucesso!', response);
          // Você pode fazer algo aqui após o registro bem-sucedido, se necessário.
        },
        error: (error: any) => {
          console.error('Erro ao registrar usuário:', error);
          window.alert(error.error?.message || 'Erro ao registrar usuário');
        }
      });
  }


  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
