import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoraPage } from './hora.page';

describe('HoraPage', () => {
  let component: HoraPage;
  let fixture: ComponentFixture<HoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
