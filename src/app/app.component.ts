import { Component, OnInit } from '@angular/core';
import { CurriculosService } from './curriculo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-ds-front';

  constructor (private curriculosService: CurriculosService){}

  ngOnInit(): void {
    this.curriculosService.getCurriculos().subscribe(
      data => {
        console.log(data); // Aqui estão os dados do NestJS
      },
      error => {
        console.error(error);
      }
    );
  }
}
