import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:3000/api/pets';  // Dirección de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las mascotas
  getPets(): Observable<any> {
    return this.http.get(this.apiUrl); // Realiza la petición GET para obtener las mascotas
  }

  // Agregar una nueva mascota
  addPet(pet: any): Observable<any> {
    return this.http.post(this.apiUrl, pet);  // Realiza la petición POST para agregar una nueva mascota
  }

  // Modificar una mascota existente
  updatePet(pet: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pet.id}`, pet);  // Realiza la petición PUT para modificar la mascota
  }

  // Eliminar una mascota
  deletePet(petId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${petId}`);  // Realiza la petición DELETE para eliminar la mascota
  }
}