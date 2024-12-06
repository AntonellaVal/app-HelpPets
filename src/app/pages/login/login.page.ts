import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    private navCtrl: NavController,
    private auten: AutenticacionService,
    private basedatosService: BasedatosService
  ) {}

  // Función para validar que el correo termine en @gmail.com o @helppets.cl
  isValidEmail(email: string): boolean {
    return email.endsWith('@gmail.com') || email.endsWith('@helppets.cl');
  }

  // Función para validar que el correo sea del administrador
  isAdminEmail(email: string): boolean {
    return email.endsWith('@helppets.cl');
  }

  // Función para validar que la contraseña tenga al menos una mayúscula, un número y un carácter especial
  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegEx.test(password);
  }

  // Función para manejar el inicio de sesión
  async login() {
    if (!this.isValidEmail(this.email)) {
      console.log("El email debe terminar en @gmail.com o @helppets.cl");
      return;
    }

    const usuario = await this.basedatosService.obtenerUsuarioPorEmail(this.email);

    if (!usuario) {
      console.log("El correo no está registrado. Por favor, regístrese primero.");
      this.navCtrl.navigateForward('/registro');
      return;
    }

    const isValidLogin = this.auten.validateLogin(this.email, this.password);

    if (isValidLogin) {
      if (this.isAdminEmail(this.email)) {
        console.log("Inicio de sesión como administrador.");
        this.navCtrl.navigateForward('/admin');
      } else {
        console.log("Inicio de sesión como usuario normal.");
        this.navCtrl.navigateForward('/animaleadopcion');
      }
    } else {
      console.log("Credenciales incorrectas. Intente de nuevo.");
    }
  }

  // Función para redirigir al registro
  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  ngOnInit() {}
}