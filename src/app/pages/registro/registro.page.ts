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
  nombre: string = "";  // Nuevo campo para el nombre del usuario
  photo: string = "";   // Nuevo campo para la foto del usuario (en formato base64)

  constructor(private navCtrl: NavController, private auten: AutenticacionService) { }

  // Validar que la contraseña cumpla con los requisitos
  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegEx.test(password);
  }

  // Validar que el email termine en @gmail.com
  isGmailEmail(email: string): boolean {
    return email.endsWith('@gmail.com');
  }

  // Función para cargar la foto seleccionada por el usuario
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;  // Guardamos la foto como base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Función para registrar al usuario
  registro(): void {
    if (this.isGmailEmail(this.email) && this.password === this.confirmPassword) {
      if (this.validPassword(this.password)) {
        this.auten.registerUser(this.email, this.password, this.nombre, this.photo);  // Guardamos el nombre y la foto
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
