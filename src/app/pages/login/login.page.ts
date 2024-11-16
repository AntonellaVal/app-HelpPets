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
      if (this.auten.validateLogin(this.email, this.password)) {
        if (this.auten.isAdmin(this.email)) {
          console.log("Inicio de sesión como administrador.");
            this.navCtrl.navigateForward('/fichaanimales');
        } else {
          console.log("Inicio de sesión como usuario normal.");
            this.navCtrl.navigateForward('/animaleadopcion');
        }
      } else {
        console.log("Por favor, ingresa un email válido y una contraseña que cumpla con los requisitos de registro.");
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
