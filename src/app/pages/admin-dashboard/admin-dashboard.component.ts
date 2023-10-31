import { Component, OnInit } from '@angular/core';
import { CurriculosService } from '../user/curriculo.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  curriculoSelecionado: any = null;
  curriculos: any[] = [];
  loggedInUser: string = this.authService.setUserName();

  constructor(
    private curriculosService: CurriculosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.curriculosService.getCurriculos().subscribe(
      (data) => {
        this.curriculos = data.map((curriculo) => {
          return {
            ...curriculo,
            skills: curriculo.skills.map((skill: { name: any }) => skill.name),
          };
        });
      },
      (error) => {
        console.error('Erro ao obter os currículos:', error);
      }
    );
  }
  verCurriculo(curriculo: any) {
    this.curriculoSelecionado = curriculo;
  }
  selecionarCurriculo(curriculo: any) {
    this.curriculosService.setCurriculoSelecionado(curriculo);
  }
}
