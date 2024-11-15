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

  inicio(){
    if (this.auten.validateLogin(this.email, this.password) && this.auten.validPassword(this.password)) {
      this.navCtrl.navigateForward('/animaleadopcion');
    } else {
      alert('Por favor, ingresa un email válido y una contraseña que cumpla con los requisitos de registro.');
    }
  }

  Irregistro(){
    this.navCtrl.navigateForward('/registro');
  }
  ngOnInit() {
  }

}
