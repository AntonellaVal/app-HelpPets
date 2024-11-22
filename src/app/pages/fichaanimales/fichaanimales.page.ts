import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fichaanimales',
  templateUrl: './fichaanimales.page.html',
  styleUrls: ['./fichaanimales.page.scss'],
})
export class FichaanimalesPage implements OnInit {
  petDetails: any = {};  // Información de la mascota seleccionada
  isAdoptable: boolean = false;  // Variable para determinar si la mascota está disponible para adopción

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Suscribirse a los parámetros de consulta y asignarlos
    this.route.queryParams.subscribe((params) => {
      if (params) {
        // Asignar los parámetros recibidos a la mascota
        this.petDetails = {
          id: params['id'],
          nombre: params['nombre'],
          especie: params['especie'],
          edad: params['edad'],
          adoptada: params['adoptada'] === 'true' // Asegúrate de convertirlo en booleano
        };
        // Verificar si la mascota está disponible para adopción
        this.isAdoptable = !this.petDetails.adoptada;  // Solo se puede adoptar si 'adoptada' es false
      }
    });
  }

  // Método para redirigir a la página de adopción
  adoptPet() {
    // Aquí redirigimos a la página de adopción con los detalles de la mascota
    this.router.navigate(['/adoptar'], {
      queryParams: {
        id: this.petDetails.id,
        nombre: this.petDetails.nombre,
        especie: this.petDetails.especie,
        edad: this.petDetails.edad,
      }
    });
  }
}
