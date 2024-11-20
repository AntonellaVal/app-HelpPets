import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private navCtrl: NavController, private auten: AutenticacionService) { }

  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{3,}$/;
    return passwordRegEx.test(password);
  }

  isGmailEmail(email: string): boolean {
    return email.endsWith('@gmail.com');
  }

  inicio(): void {
    if (this.isGmailEmail(this.email)) {
      console.log("Validando login para", this.email);  // Verificación de correo
      if (this.auten.validateLogin(this.email, this.password)) {
        console.log("Login validado");
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
      console.log("El email debe terminar en @gmail.com");
    }
}


  Irregistro(){
    this.navCtrl.navigateForward('/registro');
  }
  ngOnInit() {
  }

}
