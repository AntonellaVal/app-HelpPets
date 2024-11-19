import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service'

@Component({
  selector: 'app-animaleadopcion',
  templateUrl: './animaleadopcion.page.html',
  styleUrls: ['./animaleadopcion.page.scss'],
})
export class AnimaleadopcionPage implements OnInit {

  pets: any[] = [];  // Array para almacenar las mascotas

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets(); // Cargar las mascotas cuando se inicialice el componente
  }

  loadPets() {
    this.petService.getPets().subscribe((data: any[]) => {
      this.pets = data;  // Asignar los datos obtenidos de la API
    });
  }
}
