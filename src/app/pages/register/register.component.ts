import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { slideInLeftAnimation, slideInLeftAnimationBack, slideInRightAnimation, slideInRightAnimationBack, slideOutLeftAnimation, slideOutRightAnimation } from 'src/app/animations';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
  animations: [slideInLeftAnimation, slideOutRightAnimation, slideOutLeftAnimation, slideInRightAnimation, slideInLeftAnimationBack, slideInRightAnimationBack]
})
export class RegisterComponent {

  constructor(
    private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  newUserCredentials = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });

  register() {
    const formValues = this.newUserCredentials.value;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    return ( this.authService.register(formValues) ,this.router.navigate(['/login']))
  }

  navegarParaLoginComAtraso() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}