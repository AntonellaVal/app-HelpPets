import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animaleadopcion',
  templateUrl: './animaleadopcion.page.html',
  styleUrls: ['./animaleadopcion.page.scss'],
})
export class AnimaleadopcionPage implements OnInit {
  pets: any[] = [];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().then((data: any[]) => {
      this.pets = data;
    }).catch((error) => {
      console.error('Error al cargar las mascotas:', error);
    });
  }

  // Método para ir a la página de detalles de la mascota
  goToDetails(pet: any) {
    this.router.navigate(['/fichaanimales'], {
      queryParams: {
        id: pet.id,
        nombre: pet.nombre,
        especie: pet.especie,
        edad: pet.edad,
        adoptada: pet.adoptada
      }
    });
  }
}
