import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: any[] = [];

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data.map((user) => {
          return {
            ...user
          };
        });
      },
      error: (error) => {
        console.error('Erro ao obter os usuários:', error);
      }
    });
  }
}
