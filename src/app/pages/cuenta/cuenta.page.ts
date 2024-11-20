import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;
  userPassword: string | null = null;
  userPhoto: string | null = null;

  constructor(private authService: AutenticacionService) {}

  ngOnInit() {
    this.loadUserInfo(); // Cargar la información del usuario cuando se inicializa la página
  }

  // Método para cargar la información del usuario
  loadUserInfo() {
    this.userEmail = this.authService.getRegistroEmail();
    this.userPassword = this.authService.getRegistroPassword();
    this.userName = this.authService.getRegistroNombre();
    this.userPhoto = this.authService.getRegistroFoto();
  }

  // Método para cambiar la contraseña
  changePassword() {
    // Lógica para cambiar la contraseña, por ejemplo, mostrar un modal o un formulario
    console.log('Cambiar contraseña');
  }
}

