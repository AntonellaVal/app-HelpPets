import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.page.html',
  styleUrls: ['./hora.page.scss'],
})
export class HoraPage implements OnInit {

  cita = {
    nombre: '',
    edad: null,
    email: '',
    fecha: '',
    motivo: '',
    
  };

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  async cancelarCita() {
    // Borrar los campos del formulario
    this.cita = {
      nombre: '',
      edad: null,
      email: '',
      fecha: '',
      motivo: ''
    };
    
    // Volver a la página anterior
    this.navCtrl.back();
  }

  async confirmarCita() {
    if (this.cita.nombre === '' || this.cita.edad === null || this.cita.email === '' || this.cita.fecha === '' || this.cita.motivo === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No puede dejar campos vacíos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.cita.edad < 18 || this.cita.edad > 104) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No cumple con la edad.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.emailValido()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El email debe ser "@gmail.com" o "@hotmail.com".',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.fechaValida()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La fecha de la cita no puede ser una fecha pasada.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Cita Confirmada',
      message: 'Cita confirmada con éxito.',
      buttons: ['OK'],
    });
    await alert.present();

    // Guardar los datos en una variable (aquí se puede añadir lógica para enviarlos a una API si es necesario)
    console.log('Cita guardada:', this.cita);
  }

  emailValido(): boolean {
    const email = this.cita.email.toLowerCase();
    return email.endsWith('@gmail.com') || email.endsWith('@hotmail.com');
  }

  fechaValida(): boolean {
    const fechaActual = new Date(); // Fecha actual
    fechaActual.setHours(0, 0, 0, 0); // Eliminar la parte de la hora para hacer comparación solo por fecha

    // Descomponer la fecha ingresada por el usuario (en formato día/mes/año)
    const [dia, mes, anio] = this.cita.fecha.split('/').map(Number);
    
    // Crear una fecha ingresada por el usuario
    const fechaIngresada = new Date(anio, mes - 1, dia); // El mes en JavaScript es 0-indexado
    fechaIngresada.setHours(0, 0, 0, 0); // Eliminar la parte de la hora de la fecha ingresada

    // Verificar que la fecha ingresada no sea anterior a la fecha actual
    return fechaIngresada.getTime() >= fechaActual.getTime();
  }

  ngOnInit() {
  }

}
