import { Component, OnInit } from '@angular/core';
import { CurriculosService } from 'src/app/pages/user/curriculo.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  statusData: any;
  educationData: any;
  options: any;
  basicOptions: any;
  curriculos: any = [];
  quantAprovados: number = 0;
  quantAguardando: number = 0;
  quantReprovados: number = 0;

  quantAnalfabeto: number = 0;
  quantFundamentalCompleto: number = 0;
  quantMedioIncompleto: number = 0;
  quantMedioCompleto: number = 0;
  quantSuperiorIncompleto: number = 0;
  quantSuperiorCompleto: number = 0;
  quantMestrado: number = 0;
  quantDoutorado: number = 0;
  quantIgnorado: number = 0;


  greenColor = '#0F0';
  yellowColor = '#Ff0';
  redColor = '#F00';


  constructor(private readonly curriculosService: CurriculosService) {

  }
  ngOnInit() {
    this.curriculosService.getCurriculos().subscribe({
      next: (statusData) => {
        this.curriculos = statusData.map((curriculo) => {
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

    this.curriculosService.getCurriculos().subscribe({
      next: (educationData) => {
        this.curriculos = educationData.map((curriculo) => {
          return {
            education: curriculo.education,
          };
        });
        // Contando quantidades
        this.quantAnalfabeto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Analfabeto').length;
        this.quantFundamentalCompleto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Fundamental Completo').length;
        this.quantMedioIncompleto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Médio Incompleto').length;
        this.quantMedioCompleto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Médio Completo').length;
        this.quantSuperiorIncompleto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Superior Incompleto').length;
        this.quantSuperiorCompleto = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Superior Completo').length;
        this.quantMestrado = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Mestrado').length;
        this.quantDoutorado = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Doutorado').length;
        this.quantIgnorado = this.curriculos.filter((curriculo: { education: string; }) => curriculo.education === 'Ignorado').length;

        this.getEducation();

      },
      error: (error) => {
        console.error('Erro ao obter os currículos:', error);
      }
    });


  }

  getStatus() {
    this.statusData = {
      labels: ['Aprovado', 'Aguardando', 'Reprovado'],
      datasets: [
        {
          data: [this.quantAprovados, this.quantAguardando, this.quantReprovados],
          backgroundColor: [this.greenColor, this.yellowColor, this.redColor],
          hoverBackgroundColor: ['#4CD07D', '#EAB308', '#800']
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
  getEducation() {

    this.educationData = {
      labels: ['Analfabeto', 'Fundamental Completo', 'Médio Incompleto', 'Médio Completo', 'Superior Incompleto', 'Superior Completo', 'Mestrado', 'Doutorado', 'Ignorado'],
      datasets: [
        {
          label: 'Escolaridade',
          data: [this.quantAnalfabeto, this.quantFundamentalCompleto, this.quantMedioIncompleto, this.quantMedioCompleto, this.quantSuperiorIncompleto, this.quantSuperiorCompleto, this.quantMestrado, this.quantDoutorado, this.quantIgnorado],
          backgroundColor: ['#FF5733', '#FF944D', '#FFC266', '#FFE280', '#E5FF80', '#CCFF4D', '#B3FF33', '#99FF1A', '#80FF00'],
          hoverBackgroundColor: ['#FF5733', '#FF944D', '#FFC266', '#FFE280', '#E5FF80', '#CCFF4D', '#B3FF33', '#99FF1A', '#80FF00']
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#777'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#888'
          },
          grid: {
            color: '#888',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#888'
          },
          grid: {
            color: '#888',
            drawBorder: false
          }
        }
      }
    };
  }
}
