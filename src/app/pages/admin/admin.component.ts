import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  loggedInUser: string= '';

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe((username) => {
      this.loggedInUser = username;
    });
  }

  logout() {
    // Lógica de logout (por exemplo, limpar o token de autenticação)
    // ...
    this.authService.setLoggedInUser('');
    localStorage.removeItem('token');
    // Redireciona para a página de login após o logout
    this.router.navigate(['/login']);
  }
}
