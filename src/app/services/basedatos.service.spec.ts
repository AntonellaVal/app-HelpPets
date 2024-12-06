import { TestBed } from '@angular/core/testing';

import { BasedatosService } from './basedatos.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

class MockSQLite {
  executeSql(query: string, params: any[] = []): any {
    return of({ rows: { length: 0, item: () => null } });  
  }
}

describe('BasedatosService', () => {
  let service: BasedatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BasedatosService,
        { provide: SQLite, useClass: MockSQLite }  
      ]
    });

    service = TestBed.inject(BasedatosService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});