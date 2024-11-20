import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  pets: any[] = [];  // Lista de mascotas
  newPet = { nombre: '', especie: '', edad: null, adoptada: false };  // Formulario para nueva mascota

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets(); // Cargar mascotas al iniciar el componente
  }

  // Método para cargar las mascotas
  loadPets() {
    this.petService.getPets().then((data: any[]) => {
      this.pets = data;  // Actualizar la lista de mascotas
    }).catch((error) => {
      console.error('Error al cargar las mascotas:', error);
    });
  }

  // Método para agregar una nueva mascota
  addPet() {
    const { nombre, especie, edad, adoptada } = this.newPet;
    if (nombre && especie && edad != null) {
      this.petService.addPet(nombre, especie, edad, adoptada).then(() => {
        console.log('Mascota agregada');
        this.newPet = { nombre: '', especie: '', edad: null, adoptada: false };  // Limpiar formulario
        this.loadPets();  // Recargar mascotas
      }).catch((error) => {
        console.error('Error al agregar mascota:', error);
      });
    } else {
      console.error('Todos los campos son obligatorios');
    }
  }

  // Método para eliminar una mascota
  deletePet(id: number) {
    this.petService.deletePet(id).then(() => {
      console.log('Mascota eliminada');
      this.loadPets();  // Recargar mascotas
    }).catch((error) => {
      console.error('Error al eliminar mascota:', error);
    });
  }
}
  