import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-adoptar',
  templateUrl: './adoptar.page.html',
  styleUrls: ['./adoptar.page.scss'],
})
export class AdoptarPage implements OnInit {

  adopcion = {
    nombre: '',
    edad: null,
    email: '',
    telefono: '',
  };

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  async cancelarDarAdopcion() {
    // Borrar los campos del formulario
    this.adopcion = {
      nombre: '',
      edad: null,
      email: '',
      telefono: '',
    };
    
    // Volver a la página anterior
    this.navCtrl.back();
  }

  async adoptar() {
    const alert = await this.alertController.create({
      header: '¡Adopción exitosa!',
      message: 'La adopción ha sido exitosa. Por favor, complete el formulario de hora de visita.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige a la página del formulario de hora de visita
            this.navCtrl.navigateForward('/hora'); // Cambia la ruta según tu aplicación
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarDarAdopcion() {
    // Validar que no haya campos vacíos
    if (this.camposVacios()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No puede dejar campos vacíos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar la edad
    if (this.adopcion.edad === null || this.adopcion.edad < 18 || this.adopcion.edad > 104) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La edad no esta en el rango',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar el email
    if (!this.emailValido()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El email debe ser "@gmail.com".',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar el teléfono
    if (!this.telefonoValido()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El teléfono debe ser un número chileno válido (+56 9).',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    if (!this.nombreValido(this.adopcion.nombre)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre completo no debe contener números.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Adopción Confirmada',
      message: 'La adopción fue confirmada con éxito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          // Redirigir a otra página (ejemplo: 'pagina-confirmacion')
          this.navCtrl.navigateForward('/animaleadopcion');
        }
      }],
    });
    await alert.present();

    // Aquí podrías guardar los datos de la adopción o enviarlos a un backend
    console.log('Adopción guardada:', this.adopcion);
  }

  camposVacios(): boolean {
    const { nombre, edad, email, telefono } = this.adopcion;
    return !nombre || !edad || !email || !telefono;
  }

  emailValido(): boolean {
    const email = this.adopcion.email.toLowerCase();
    return email.endsWith('@gmail.com');
  }

  telefonoValido(): boolean {
    const telefono = this.adopcion.telefono;
    const regexTelefonoChileno = /^(\+56)?9\d{8}$/;
    return regexTelefonoChileno.test(telefono);
  }

  nombreValido(nombre: string): boolean {
    const regexNombre = /^[A-Za-z\s]+$/; // Permitir solo letras y espacios
    return regexNombre.test(nombre);
}


  ngOnInit() {
  }

}
