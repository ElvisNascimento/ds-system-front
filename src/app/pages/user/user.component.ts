import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public curriculo: FormGroup = new FormGroup({
    nome: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    cpf: new FormControl(null, [Validators.required, this.validarCPF]),
    dataNascimento: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    telefone: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    escolaridade: new FormControl(null),
    funcao: new FormControl(null),
    competencias: new FormArray([this.createCompetencia()]),
  });

  constructor() {}

  ngOnInit(): void {}

  addCompetencia() {
    const competencias = this.curriculo.get('competencias') as FormArray;
    competencias.push(this.createCompetencia());
  }

  removeCompetencia(index: number) {
    const competencias = this.curriculo.get('competencias') as FormArray;
    competencias.removeAt(index);
  }

  createCompetencia() {
    return new FormGroup({
      nome: new FormControl(null),
      level: new FormControl(null),
      descricao: new FormControl(null),
    });
  }

  submitCurriculo(): void {
    console.log(this.curriculo);
  }


  validarCPF(control: FormControl): { [key: string]: any } | null {
    let cpf = control.value;

    if (!cpf) {
      return null;
    }

    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
      return { 'cpfInvalido': true };
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return { 'cpfInvalido': true };
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10), 10)) {
      return { 'cpfInvalido': true };
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11), 10)) {
      return { 'cpfInvalido': true };
    }

    return null;
  }

}
