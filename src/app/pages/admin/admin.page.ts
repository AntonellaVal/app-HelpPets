import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  pets: any[] = [];  // Lista de mascotas
  newPet = { nombre: '', especie: '', edad: null, adoptada: false, foto: ''};  // Formulario para nueva mascota

  foto: string | null = null;

  constructor(private petService: PetService, private camera: Camera) {}

  ngOnInit() {
    this.loadPets(); // Cargar mascotas al iniciar el componente
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
      this.foto = this.foto;
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
      this.foto = this.foto;
    } catch (error) {
      console.error(error);
    }
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
        this.newPet = { nombre: '', especie: '', edad: null, adoptada: false, foto: '' };  // Limpiar formulario
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

  // Método para alternar el estado de adopción de una mascota
  toggleAdoptionStatus(pet: any) {
    const newStatus = !pet.adoptada; // Cambiar al estado opuesto
    this.petService.updateAdoptionStatus(pet.id, newStatus).then(() => {
      console.log(`Estado de adopción actualizado: ${newStatus ? 'Adoptada' : 'No adoptada'}`);
      this.loadPets(); // Recargar mascotas para reflejar el cambio
    }).catch((error) => {
      console.error('Error al actualizar el estado de adopción:', error);
    });
  }
}
