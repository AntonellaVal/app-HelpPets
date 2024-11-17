import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";
  errorLogin: boolean = false;

  constructor(private navCtrl: NavController, private auten: AutenticacionService,private bdService: BasedatosService) { }

  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/; // Al menos 8 caracteres, una mayúscula, un número y un carácter especial
    return passwordRegEx.test(password);
  }
  
  async inicio() {
    // Reinicia el estado del error
    this.errorLogin = false;

    try {
      // Valida si el usuario existe y la contraseña es correcta
      const usuarioValido = await this.auten.validateLogin(this.email, this.password);

      if (usuarioValido && this.validPassword(this.password)) {
        // Redirige a la página principal si las credenciales son válidas
        this.navCtrl.navigateForward('/animaleadopcion');
      } else {
        // Muestra el mensaje de error si las credenciales son incorrectas
        this.errorLogin = true;
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      this.errorLogin = true;
    }
  }

  Irregistro() {
    this.navCtrl.navigateForward('/registro');
  }

  ngOnInit() {
    this.bdService.abrirBaseDatos();
  }

}
