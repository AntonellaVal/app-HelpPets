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
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  nombre: string = '';
  photo: string = '';

  constructor(
    private navCtrl: NavController,
    private auten: AutenticacionService,
    private basedatos: BasedatosService
  ) {}

  validPassword(password: string): boolean {
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegEx.test(password);
  }

  isValidEmail(email: string): boolean {
    return email.endsWith('@gmail.com') || email.endsWith('@helppets.cl');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
        console.log('Foto convertida a Base64:', this.photo); // Debug
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona una imagen válida.');
    }
  }
  
  async registro() {
    if (!this.isValidEmail(this.email)) {
      alert('El correo debe terminar en @gmail.com o @helppets.cl.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!this.validPassword(this.password)) {
      alert('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }

    try {
      await this.basedatos.registrarUsuario(this.email, this.password);
      this.auten.registerUser(this.email, this.password, this.nombre, this.photo);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Error al registrar el usuario. Intenta nuevamente.');
    }
  }

  ngOnInit() {}
}