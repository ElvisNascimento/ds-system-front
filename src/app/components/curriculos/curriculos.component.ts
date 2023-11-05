import { Component, OnInit } from '@angular/core';
import { CurriculosService } from 'src/app/pages/user/curriculo.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.css']
})
export class CurriculosComponent implements OnInit {
  curriculoSelecionado: any = null;
  curriculos: any[] = [];
  loggedInUser: any = localStorage.getItem('userName');
  selectedStatus: string = '';

  constructor(
    private curriculosService: CurriculosService,
  ) {}

  ngOnInit(): void {
    this.curriculosService.getCurriculos().subscribe({
      next: (data) => {
        // console.log(data);
        this.curriculos = data.map((curriculo) => {
          return {
            ...curriculo,
            skills: curriculo.skills.map((skill: any) => {
              return {
                name: skill.name,
                description: skill.description,
                level: skill.level
              };
            }),
          };
        });
      },
      error: (error) => {
        console.error('Erro ao obter os currículos:', error);
      }
    });
  }

  selectCurriculo(idCurriculo: any){
    return this.curriculoSelecionado = this.curriculos.find(curriculo => curriculo.id === idCurriculo);
  }


  setNewStatus(curriculoId: any) {
    console.log(curriculoId);
    this.selectCurriculo(curriculoId);

    console.log(this.selectedStatus)
    console.log('curriculo',this.curriculoSelecionado);

    if (this.curriculoSelecionado && this.selectedStatus) {
      this.curriculoSelecionado.status = this.selectedStatus;

      this.curriculosService.updateCurriculo(curriculoId).subscribe({
        next: (data) => {
          console.log('Status do currículo atualizado com sucesso:', data);
        },
        error: (error) => {
          console.error('Erro ao atualizar o status do currículo:', error);
        }
      });
    } else {
      console.error('Currículo não selecionado ou status não selecionado');
    }
  }
}
