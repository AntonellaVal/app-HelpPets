import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private readonly EMAIL_KEY = 'registroEmail';
  private readonly PASSWORD_KEY = 'registroPassword';

  constructor() { }

  registerUser(email: string, password: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.PASSWORD_KEY, password);
  }

  getRegistroEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getRegistroPassword(): string | null {
    return localStorage.getItem(this.PASSWORD_KEY);
  }

  validateLogin(email: string, password: string): boolean {
    const registroEmail = this.getRegistroEmail();
    const registroPassword = this.getRegistroPassword();
    return email === registroEmail && password === registroPassword;
  }

  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{3,}$/;
    return passwordRegEx.test(password);
  }
}
