import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService) {
  }

  newUserCredentials = new FormGroup({
    'name': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required)
  });

  register() {
    console.log(this.newUserCredentials.value);
    this.authService.register(this.newUserCredentials);
  }
}