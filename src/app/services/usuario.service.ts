import { Injectable } from '@angular/core';
import { BasedatosService } from './basedatos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private basedatosService: BasedatosService) { }

  async registrarUsuario(email: string, password: string) {
    return this.basedatosService.agregarUsuario(email, password);
  }

  async cambiarPassword(email: string, nuevaPassword: string) {
    return this.basedatosService.actualizarPassword(email, nuevaPassword);
  }

  async obtenerUsuario(email: string) {
    return this.basedatosService.obtenerUsuarioPorEmail(email);
  }

}
