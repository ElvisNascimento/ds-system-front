import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculosService } from '../../pages/user/curriculo.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  curriculos: any = [];

  constructor(private router: Router, private curriculosService: CurriculosService) { }
  ngOnInit(): void {
    this.curriculosService.getCurriculos().subscribe(
      curriculos => {
        this.curriculos = curriculos;
      },
      error => {
        console.error('Erro ao obter currículos:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
  getQuantCurriculos(): number {
    return this.curriculos.length;
  }
  navegarParaCurriculos() {
    this.router.navigate(['admin', { outlets: { curriculos: ['curriculos'] } }]);
  }

}