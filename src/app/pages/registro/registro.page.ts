import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private navCtrl: NavController, private auten: AutenticacionService, private bdService: BasedatosService) { }

  ngOnInit() {
    this.bdService.abrirBaseDatos();
  }

  validPassword(password: string): boolean {
    // Expresión regular: al menos una mayúscula, un número y un carácter especial
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegEx.test(password);
  }

  registro(){
    if (this.password === this.confirmPassword && this.auten.validPassword(this.password)) {
      this.auten.registerUser(this.email, this.password);
      console.log('Usuario registrado exitosamente');
      
      this.navCtrl.navigateForward('/login');  
    } else {
      alert('Las contraseñas no coinciden o no cumplen con los requisitos.');
    }
  }

}
