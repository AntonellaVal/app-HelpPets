import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private navCtrl: NavController, private auten: AutenticacionService) { }

  validPassword(password: string): boolean {
    // Expresión regular: al menos una mayúscula, un número y un carácter especial
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegEx.test(password);
  }

  isGmailEmail(email: string): boolean {
    return email.endsWith('@gmail.com');
  }

  registro(): void {
    if (this.isGmailEmail(this.email) && this.password === this.confirmPassword) {
      if (this.validPassword(this.password)) {
        this.auten.registerUser(this.email, this.password);
        console.log("Registro exitoso.");
          this.navCtrl.navigateForward('/login');
      } else {
        console.log("La contraseña no cumple con los requisitos.");
      }
    } else {
      alert("El correo debe terminar en @gmail.com y las contraseñas deben coincidir.");
    }
  }

  ngOnInit() {
  }

}
