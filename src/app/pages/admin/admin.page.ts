import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';  // El servicio que creaste para interactuar con la API
import { NavController } from '@ionic/angular';  // Para navegar entre páginas

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  pets: any[] = [];  // Array de mascotas
  petToEdit: any = null;  // Para almacenar la mascota que estamos editando
  newPet: any = { nom_masc: '', edad_masc: null, adoptado: false, especie_masc: '' };  // Para el formulario de agregar mascota

  constructor(private petService: PetService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().subscribe((data: any[]) => {
      this.pets = data;  // Cargar las mascotas desde la API
    });
  }

  // Función para agregar una nueva mascota
  addPet() {
    this.petService.addPet(this.newPet).subscribe((data) => {
      this.loadPets();  // Recargar las mascotas después de agregar
      this.newPet = { nom_masc: '', edad_masc: null, adoptado: false, especie_masc: '' };  // Limpiar el formulario
    });
  }

  // Función para editar una mascota existente
  editPet(pet: any) {
    this.petToEdit = { ...pet };  // Crear una copia para editar
  }

  // Función para guardar los cambios de una mascota
  savePet() {
    if (this.petToEdit) {
      this.petService.updatePet(this.petToEdit).subscribe(() => {
        this.loadPets();  // Recargar las mascotas después de modificar
        this.petToEdit = null;  // Limpiar la mascota que se está editando
      });
    }
  }

  // Función para eliminar una mascota
  deletePet(petId: number) {
    this.petService.deletePet(petId).subscribe(() => {
      this.loadPets();  // Recargar las mascotas después de eliminar
    });
  }
}