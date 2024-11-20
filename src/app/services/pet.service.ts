import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private db!: SQLiteObject;
  private petsSubject = new BehaviorSubject<any[]>([]); // Observable para monitorear cambios en mascotas

  constructor(private sqlite: SQLite) {
    this.createDatabase(); // Iniciar la creación de la base de datos
  }

  // Método para crear la base de datos usando async/await
  private async createDatabase(): Promise<void> {
    try {
      const db: SQLiteObject = await this.sqlite.create({
        name: 'pets.db',
        location: 'default',
      });
      this.db = db;  // Asignamos la instancia de la base de datos
      console.log('Base de datos creada');
      
      await this.db.executeSql(
        'CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, especie TEXT, edad INTEGER, adoptada TEXT)',
        []
      );
      this.loadPets(); // Llamar a la carga de mascotas cuando la base de datos se haya creado correctamente
    } catch (error) {
      console.error('Error al crear la base de datos:', error);
    }
  }

  // Método para agregar una mascota usando async/await
  async addPet(nombre: string, especie: string, edad: number, adoptada: boolean): Promise<void> {
    if (!this.db) {
      return Promise.reject('Base de datos no inicializada');
    }

    try {
      await this.db.executeSql(
        'INSERT INTO pets (nombre, especie, edad, adoptada) VALUES (?, ?, ?, ?)',
        [nombre, especie, edad, adoptada ? 'true' : 'false']
      );
      this.loadPets(); // Recargar mascotas
    } catch (error) {
      console.error('Error al agregar mascota:', error);
      return Promise.reject(error);
    }
  }

  // Método para obtener mascotas usando async/await
  async getPets(): Promise<any[]> {
    if (!this.db) {
      return Promise.reject('Base de datos no inicializada');
    }

    try {
      const res = await this.db.executeSql('SELECT * FROM pets', []);
      const pets = [];
      for (let i = 0; i < res.rows.length; i++) {
        pets.push(res.rows.item(i));
      }
      return pets;
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      return Promise.reject(error);
    }
  }

  // Método para eliminar una mascota usando async/await
  async deletePet(id: number): Promise<void> {
    if (!this.db) {
      return Promise.reject('Base de datos no inicializada');
    }

    try {
      await this.db.executeSql('DELETE FROM pets WHERE id = ?', [id]);
      this.loadPets(); // Recargar mascotas después de eliminar
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      return Promise.reject(error);
    }
  }

  // Método para cargar mascotas desde la base de datos usando async/await
  private async loadPets(): Promise<void> {
    if (!this.db) {
      console.error('La base de datos no está inicializada');
      return;
    }

    try {
      const res = await this.db.executeSql('SELECT * FROM pets', []);
      const pets = [];
      for (let i = 0; i < res.rows.length; i++) {
        pets.push(res.rows.item(i));
      }
      this.petsSubject.next(pets); // Emitir las mascotas a los suscriptores
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    }
  }
}

