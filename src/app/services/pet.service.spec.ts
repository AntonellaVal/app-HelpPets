import { TestBed } from '@angular/core/testing';

import { PetService } from './pet.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SQLite]
    });
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
