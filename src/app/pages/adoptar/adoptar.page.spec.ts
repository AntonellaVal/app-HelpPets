import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptarPage } from './adoptar.page';
import { AlertController, NavController } from '@ionic/angular';


class Mockadopcion {
  adopcion = {
    telefono: '+56 9 98765432'
  };
}

describe('AdoptarPage', () => {
  let component: AdoptarPage;
  let fixture: ComponentFixture<AdoptarPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptarPage],
      providers: [
        AlertController, 
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería dar false si el teléfono no cumple con los números iniciales (9XXXXXXXX)', () => {
    component.adopcion.telefono = '898765432'; 
    const resultado = component.telefonoValido(); 
    expect(resultado).toBeFalse(); 
  });
});