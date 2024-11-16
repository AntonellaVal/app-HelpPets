import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoraPage } from './hora.page';
import { FormsModule } from '@angular/forms';

describe('HoraPage', () => {
  let component: HoraPage;
  let fixture: ComponentFixture<HoraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoraPage],
      imports: [FormsModule], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.cita = {
      nombre: '',
      edad: null,
      email: '',
      fecha: '', 
      motivo: '',
    };

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería dar false si la fecha es pasada al dia presente ', () => {
    component.cita.fecha = '14/11/2024' ;
    const resultado = component.fechaValida();
    expect(resultado).toBeFalse();
  });
});
