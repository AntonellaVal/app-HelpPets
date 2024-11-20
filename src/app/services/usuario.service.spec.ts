import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { BasedatosService } from './basedatos.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Asegúrate de que este import sea correcto

// Mock de SQLite
class MockSQLite {
  executeSql() {
    return Promise.resolve('Mocked SQL execution result');
  }
}

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioService,
        BasedatosService,
        { provide: SQLite, useClass: MockSQLite }  // Proveemos el mock
      ]
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
