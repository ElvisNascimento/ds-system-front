import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurriculosService } from './curriculo.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  curriculos: any[] = [];
  userCurriculos: any[] = [];

  public curriculo: FormGroup = new FormGroup({
    name: new FormControl(localStorage.getItem('userName'), [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    cpf: new FormControl('', [Validators.required, this.validarCPF]),
    born: new FormControl(''),
    email: new FormControl(localStorage.getItem('userEmail'), [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    education: new FormControl(''),
    func: new FormControl(''),
    skills: new FormArray([this.createCompetencia()]),
  });

  userName: any;
  userEmail: any;


  constructor(
    private authService: AuthService,
    private curriculosService: CurriculosService
  ) {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  }

  mostrarFormulario = false;
  curriculosCadastrados: any[] = [];

  ngOnInit(): void {
    this.getCurriculos();
  }

  getCurriculos() {
    console.log(this.userEmail);

    this.curriculosService.getCurriculosByEmail(this.userEmail).subscribe({
      next: (data) => {
        this.userCurriculos = data
      }
    });
  }

  ngOnChange() {
    this.getCurriculos();
  }


  novoCurriculo() {
    this.mostrarFormulario = true;
  }

  get skills() {
    return this.curriculo.get('skills') as FormArray;
  }

  addCompetencia() {
    this.skills.push(this.createCompetencia());
  }

  removeCompetencia(index: number) {
    this.skills.removeAt(index);
  }

  createCompetencia() {
    return new FormGroup({
      name: new FormControl(''),
      level: new FormControl(''),
      description: new FormControl(''),
    });
  }

  submitCurriculo(): void {
    const dataValues = this.curriculo.value;
    this.curriculosService.registerCurriculo(dataValues).subscribe(
      (response) => {
        console.log('Curriculo registrado com sucesso!', response);
        // Fazer algo aqui após o registro bem-sucedido, se necessário.
        this.getCurriculos();
      },
      (error) => {
        console.error('Erro ao registrar curriculo:', error);
        window.alert(error.error?.message || 'Erro ao registrar usuário');
      }
    );
  }

  onBlur(fieldName: string) {
    const control = this.curriculo.get(fieldName);

    if (control?.valid) {
      control?.markAsUntouched();
    }
  }

  validarCPF(control: FormControl): { [key: string]: any } | null {
    let cpf = control.value;

    if (!cpf) {
      return null;
    }

    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return { cpfInvalido: true };
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
      return { cpfInvalido: true };
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
      return { cpfInvalido: true };
    }

    return null;
  }
}
