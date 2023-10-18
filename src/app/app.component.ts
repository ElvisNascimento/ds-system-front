import { Component, OnInit } from '@angular/core';
import { CurriculosService } from './pages/user/curriculo.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-ds-front';

  constructor (private authService:AuthService, private curriculosService: CurriculosService){}

  ngOnInit(): void {
    // this.curriculosService.getCurriculos().subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    // this.authService.login(Credential).subscribe({
    //   next : ()=>{console.log(Credential)},

    //   });
  }
}
