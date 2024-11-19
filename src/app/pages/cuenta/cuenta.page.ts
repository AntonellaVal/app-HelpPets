import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {
  email: string = '';
  password: string = '';
  nuevaPassword: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  // Método para cambiar la contraseña
  async cambiarPassword() {
    if (this.email && this.password && this.nuevaPassword) {
      try {
        // Primero, comprobamos si el usuario existe
        const usuario = await this.usuarioService.obtenerUsuario(this.email);

        if (usuario && usuario.password === this.password) {
          // Si la contraseña es correcta, actualizamos la contraseña
          await this.usuarioService.cambiarPassword(this.email, this.nuevaPassword);
          this.mostrarAlerta('Contraseña cambiada correctamente');
        } else {
          this.mostrarAlerta('Email o contraseña incorrectos');
        }
      } catch (error) {
        this.mostrarAlerta('Ocurrió un error al intentar cambiar la contraseña');
      }
    } else {
      this.mostrarAlerta('Por favor, complete todos los campos');
    }
  }

  // Mostrar una alerta en pantalla
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
