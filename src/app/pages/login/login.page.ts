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
    private navCtrl: NavController,  private auten: AutenticacionService,private basedatosService: BasedatosService) { }

  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{3,}$/;
    return passwordRegEx.test(password);
  }

  isGmailEmail(email: string): boolean {
    return email.endsWith('@gmail.com');
  }

  // Método para iniciar sesión o registrar al usuario
  async inicio() {
    if (this.isGmailEmail(this.email)) {
      console.log("Validando login para", this.email);  // Verificación de correo

      // Verificar si el usuario ya está registrado
      const usuario = await this.basedatosService.obtenerUsuarioPorEmail(this.email);
      
      if (usuario) {
        console.log("Usuario encontrado. Validando credenciales...");

        // Validar la contraseña
        if (this.auten.validateLogin(this.email, this.password)) {
          console.log("Login validado");

          // Redirigir dependiendo si es admin o usuario normal
          if (this.auten.isAdmin(this.email)) {
            console.log("Inicio de sesión como administrador.");
            this.navCtrl.navigateForward('/admin');  // Redirección a Admin
          } else {
            console.log("Inicio de sesión como usuario normal.");
            this.navCtrl.navigateForward('/animaleadopcion');  // Redirección a Animaleadopcion
          }
        } else {
          console.log("Error en el login: Credenciales incorrectas");
        }
      } else {
        console.log("Usuario no encontrado. Registrando...");

        // Si el usuario no existe, registrar al usuario
        await this.basedatosService.agregarUsuario(this.email, this.password);
        console.log("Usuario registrado con éxito");

        // Redirigir al usuario a la página de adopción
        this.navCtrl.navigateForward('/animaleadopcion');  // Redirección a Animaleadopcion
      }
    } else {
      console.log("El email debe terminar en @gmail.com");
    }
  }

  Irregistro() {
    this.navCtrl.navigateForward('/registro');
  }

  ngOnInit() { }
}
