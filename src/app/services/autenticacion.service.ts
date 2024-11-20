import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private readonly EMAIL_KEY = 'registroEmail';
  private readonly PASSWORD_KEY = 'registroPassword';
  private readonly ADMIN_EMAIL = 'administrador@gmail.com';
  private readonly NAME_KEY = 'registroNombre';
  private readonly PHOTO_KEY = 'registroFoto';


  constructor() { }

  registerUser(email: string, password: string, nombre: string, photo: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.PASSWORD_KEY, password);
    localStorage.setItem(this.NAME_KEY, nombre);
    localStorage.setItem(this.PHOTO_KEY, photo); // Guardar la foto
  }

  getRegistroEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getRegistroPassword(): string | null {
    return localStorage.getItem(this.PASSWORD_KEY);
  }

  getRegistroNombre(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }

  getRegistroFoto(): string | null {
    return localStorage.getItem(this.PHOTO_KEY);
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

  isAdmin(email: string): boolean {
    return email === this.ADMIN_EMAIL;
  }
  
}
