import { Component, Input } from '@angular/core';
import { CurriculosService } from '../pages/user/curriculo.service';

@Component({
  selector: 'app-detalhes-curriculo',
  templateUrl: './detalhes-curriculo.component.html',
  styleUrls: ['./detalhes-curriculo.component.css']
})
export class DetalhesCurriculoComponent {
  @Input() curriculo: any;
  constructor(private curriculosService: CurriculosService) { }
  get curriculoSelecionado() {
    return this.curriculosService.getCurriculoSelecionado();
  }

  fecharDetalhes() {
    this.curriculo = null;
  }
}
