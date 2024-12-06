import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private readonly ADMIN_DOMAIN = '@helppets.cl';

  private readonly EMAIL_KEY = 'registroEmail';
  private readonly NAME_KEY = 'registroNombre';
  private readonly PHOTO_KEY = 'registroFoto';

  constructor() {}

  registerUser(email: string, password: string, nombre: string, photo: string): void {
    console.log('Guardando foto en LocalStorage:', photo); // Debug
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem('registroPassword', password);
    localStorage.setItem(this.NAME_KEY, nombre);
    localStorage.setItem(this.PHOTO_KEY, photo); // Guardar la foto
  }

  isAdmin(email: string): boolean {
    return email.endsWith(this.ADMIN_DOMAIN);
  }

  validateLogin(email: string, password: string): boolean {
    const registroEmail = localStorage.getItem(this.EMAIL_KEY);
    const registroPassword = localStorage.getItem('registroPassword');
    return email === registroEmail && password === registroPassword;
  }

  getRegistroEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getRegistroNombre(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }

  getRegistroFoto(): string | null {
    const photo = localStorage.getItem(this.PHOTO_KEY);
    return photo && photo.startsWith('data:image') ? photo : null; // Verificar formato válido
  }
}
