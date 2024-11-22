import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería devolver false si el email no contiene el @gmail.com', () => {
    const resultado = component.isGmailEmail('antonella')
    expect(resultado).toBeFalse();
  });

  it('Debería devolver true si el email contiene "@gmail.com"', () => {
    const resultado = component.isGmailEmail('antonella@gmail.com');
    expect(resultado).toBeTrue();
  });

});
