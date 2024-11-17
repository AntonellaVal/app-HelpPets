import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  
})

export class Daradopcion {
  idsolicitud!: number;
  nombre_persona!: string;
  email!: string;
  edad_persona!: number;
  telefono!: string;
  nombre_mascota!: string;
  edad_mascota!: string;
  vacunas_mascotas!: string;
  problemas_salud!: string;
  historia_mascota!: string;
  foto!: string;
}
