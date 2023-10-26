// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideInLeftAnimation, slideInLeftAnimationBack, slideInRightAnimation, slideInRightAnimationBack, slideOutLeftAnimation, slideOutRightAnimation } from 'src/app/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInLeftAnimation, slideOutRightAnimation, slideOutLeftAnimation,slideInRightAnimation,slideInLeftAnimationBack,slideInRightAnimationBack]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  credentials = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  });


  loginResult: any = [];
  loggedInUser: string = '';

  login() {
    this.authService.login(this.credentials.value);
  }
  navegarParaLoginComAtraso() {
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 500);
  }
}
