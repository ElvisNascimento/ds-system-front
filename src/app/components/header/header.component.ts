import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  condicao: boolean = true;

  constructor(private readonly authService:AuthService)
{}
logout() {
  return this.authService.logout();
}

}
