// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
      next:

        (response: any) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          const decodedToken: any = jwt_decode(token);

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
    this.loggedInUserSubject.next(username);
  }

  register(newUserCredentials: any): Observable<any> {
    console.log(`usuario ${newUserCredentials} cadastrado`);

    return this.http.post(`${this.apiUrl}/register`, newUserCredentials);
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    // Aqui, você pode adicionar a lógica para verificar se o usuário está autenticado.
    // Isso pode envolver a verificação de um token JWT, uma sessão, ou outra forma de autenticação.
    // Por exemplo, se você está usando JWT:
    return !!localStorage.getItem('token');
    // return false; // Por padrão, estamos retornando falso, mas você deve substituir por sua própria lógica.
  }
}
