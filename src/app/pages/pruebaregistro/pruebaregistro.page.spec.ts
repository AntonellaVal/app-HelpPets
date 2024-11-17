import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaregistroPage } from './pruebaregistro.page';

describe('PruebaregistroPage', () => {
  let component: PruebaregistroPage;
  let fixture: ComponentFixture<PruebaregistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaregistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
