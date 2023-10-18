import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCurriculoComponent } from './detalhes-curriculo.component';

describe('DetalhesCurriculoComponent', () => {
  let component: DetalhesCurriculoComponent;
  let fixture: ComponentFixture<DetalhesCurriculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesCurriculoComponent]
    });
    fixture = TestBed.createComponent(DetalhesCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
