import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { BasedatosService } from 'src/app/services/basedatos.service';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;
  userPhoto: string | null = null;

  constructor(private authService: AutenticacionService, private navCtrl: NavController) {}

  cerrarSesion() {
    this.navCtrl.navigateRoot('/login');
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userEmail = this.authService.getRegistroEmail();
    this.userName = this.authService.getRegistroNombre();
    this.userPhoto = this.authService.getRegistroFoto();
  }

  onChangePhoto() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Simula el clic en el input de archivo
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userPhoto = reader.result as string;
        console.log('Nueva foto seleccionada:', this.userPhoto);

        // Actualiza la foto en LocalStorage
        this.authService.registerUser(
          this.userEmail || '',
          '', // No se requiere actualizar la contraseña
          this.userName || '',
          this.userPhoto
        );
        alert('Foto actualizada exitosamente.');
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona una imagen válida.');
    }
  }

  changePassword() {
    console.log('Cambiar contraseña');
  }
}