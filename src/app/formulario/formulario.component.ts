import { Component } from '@angular/core';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formData = { nome: '', email: '' };

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
}
