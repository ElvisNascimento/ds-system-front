import { Component, OnInit } from '@angular/core';
import { CurriculosService } from 'src/app/pages/user/curriculo.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  data: any;
  options: any;
  curriculos: any = [];
  quantAprovados: number = 0;
  quantAguardando: number = 0;
  quantReprovados: number = 0;

  greenColor = '#0F0';
  yellowColor = '#Ff0';
  redColor = '#F00';

  constructor(private readonly curriculosService: CurriculosService) {

  }
  ngOnInit() {
    this.curriculosService.getCurriculos().subscribe({
      next: (data) => {
        this.curriculos = data.map((curriculo) => {
          return {
            status: curriculo.status,
          };
        });
        // Contando quantidades
        this.quantAprovados = this.curriculos.filter((curriculo: { status: string; }) => curriculo.status === 'aprovado').length;
        this.quantAguardando = this.curriculos.filter((curriculo: { status: string; }) => curriculo.status === 'aguardando').length;
        this.quantReprovados = this.curriculos.filter((curriculo: { status: string; }) => curriculo.status === 'reprovado').length;
        this.getStatus();
      },
      error: (error) => {
        console.error('Erro ao obter os currículos:', error);
      }
    });
  }
  getStatus() {
    console.log(this.quantAprovados,this.quantAguardando,this.quantReprovados);

    this.data = {
      labels: ['Aprovado', 'Aguardando', 'Reprovado'],
      datasets: [
        {
          data: [this.quantAprovados, this.quantAguardando, this.quantReprovados],
          backgroundColor: [this.greenColor, this.yellowColor, this.redColor],
          hoverBackgroundColor: [this.greenColor, this.yellowColor, this.redColor]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#007700'
          }
        }
      }
    };
  }
}
