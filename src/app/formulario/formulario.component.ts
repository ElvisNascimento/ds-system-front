import { Component } from '@angular/core';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formData: {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    escolaridade: string[];
    funcao: string;
    competencias: {
      nome: string;
      descricao: string;
      level: string;
    }[];
  } = {
    nome: '',
    cpf: '000.000.000-00',
    email: '',
    telefone: '',
    escolaridade: [],
    funcao: '',
    competencias: [{
      nome: '',
      descricao: '',
      level: ''
    }]
  };

  constructor(private formularioService: FormularioService) { }

  submitForm() {
    console.log(this.formData);
    this.formularioService.salvarDados(this.formData).subscribe(
      response => {
        console.log('Dados enviados com sucesso!', response.message);
      },
      error => {
        console.error('Erro ao enviar os dados', error);
      }
    );
  }
  adicionarCompetencia() {
    this.formData.competencias.push({ nome: '', descricao: '', level: '' });
  }
}
