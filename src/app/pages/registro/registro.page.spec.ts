import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { FormsModule } from '@angular/forms';


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [FormsModule], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería devolver false si la contraseña no contiene una mayúscula, un número y un carácter especial', () => {
    const resultado = component.validPassword('password123'); // Falta mayúscula y carácter especial
    expect(resultado).toBeFalse();
  });
});