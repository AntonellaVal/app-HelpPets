import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importar SQLite
import { of } from 'rxjs';  // Importar para simulación de observables
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { FormsModule } from '@angular/forms';

// Mock de SQLite
class SQLiteMock {
  openDatabase() {
    return Promise.resolve();
  }

  executeSql(query: string, params: any[]) {
    return Promise.resolve({ rows: { length: 1, item: () => ({ id: 1, email: 'usuario@gmail.com' }) } });
  }
}

// Mock de AutenticacionService
class AutenticacionServiceMock {
  getRegistroEmail() {
    return 'usuario@gmail.com';  // Mock del email
  }

  getRegistroPassword() {
    return 'password';  // Mock de la contraseña
  }

  // Otros métodos que necesites mockear
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule],
      providers: [
        { provide: SQLite, useClass: SQLiteMock },  // Usar el mock de SQLite
        { provide: AutenticacionService, useClass: AutenticacionServiceMock },  // Usar el mock de AutenticacionService
        BasedatosService  // Asegúrate de incluir el servicio real BasedatosService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia retornar falso si el email no contiene @gmail.com', () => {
    // Verifica que el email no contiene '@gmail.com'
    const resultado = component.isGmailEmail('anto@hotmail.com');  // Email no válido
    expect(resultado).toBeFalse();
  });
});
