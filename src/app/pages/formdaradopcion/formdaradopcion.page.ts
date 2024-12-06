import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Daradopcion } from 'src/app/services/daradopcion.service';

@Component({
  selector: 'app-formdaradopcion',
  templateUrl: './formdaradopcion.page.html',
  styleUrls: ['./formdaradopcion.page.scss'],
})
export class FormdaradopcionPage implements OnInit {
  especiesValida(): any {
    throw new Error('Method not implemented.');
  }

  daradopcion: Daradopcion = new Daradopcion();
  foto: string | null = null;

  constructor(
    private alertController: AlertController, private navCtrl: NavController, private camera: Camera, private basedatosService: BasedatosService) {}

  ngOnInit() {
    this.basedatosService.abrirBaseDatos();
  }

  async seleccionarFoto() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.foto = `data:image/jpeg;base64,${imageData}`;
      this.daradopcion.foto = this.foto;
    } catch (error) {
      console.error(error);
    }
  }

  async tomarFoto() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.foto = `data:image/jpeg;base64,${imageData}`;
      this.daradopcion.foto = this.foto;
    } catch (error) {
      console.error(error);
    }
  }

  async confirmarDarAdopcion() {
    if (this.camposVacios()) {
      await this.mostrarAlerta('Error', 'No puede dejar campos vacíos.');
      return;
    }

    if (!this.emailValido()) {
      await this.mostrarAlerta('Error', 'El email debe ser "@gmail.com".');
      return;
    }

    if (!this.telefonoValido()) {
      await this.mostrarAlerta('Error', 'El teléfono debe ser un número chileno válido (+56 9).');
      return;
    }

    if (!this.especieValida()) {
      await this.mostrarAlerta('Error', 'La especie debe ser "perro", "gato" o "conejo".');
      return;
    }

    try {
      await this.basedatosService.agregarSolicitud(this.daradopcion);
      await this.mostrarAlerta('Adopción Confirmada', 'La adopción fue confirmada con éxito.');
      this.navCtrl.navigateForward('/animaleadopcion');
    } catch (error) {
      console.error(error);
      await this.mostrarAlerta('Error', 'No se pudo guardar la adopción.');
    }
  }

  public camposVacios(): boolean {
    return !this.daradopcion.nombre_persona || !this.daradopcion.email || !this.daradopcion.edad_persona || !this.daradopcion.telefono || 
           !this.daradopcion.nombre_mascota || !this.daradopcion.edad_mascota || !this.daradopcion.especie ||
           !this.daradopcion.vacunas_mascotas || !this.daradopcion.problemas_salud || !this.daradopcion.historia_mascota || !this.daradopcion.foto;
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private emailValido(): boolean {
    return this.daradopcion.email.endsWith('@gmail.com');
  }

  private telefonoValido(): boolean {
    const regexTelefonoChileno = /^(\+56)?9\d{8}$/;
    return regexTelefonoChileno.test(this.daradopcion.telefono);
  }

  private especieValida(): boolean {
    const especiesValidas = ['perro', 'gato', 'conejo'];
    return especiesValidas.includes(this.daradopcion.especie?.toLowerCase());
  }

}
