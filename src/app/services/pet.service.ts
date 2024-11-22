import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private database!: SQLiteObject;
  private petsTable = `
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      especie TEXT,
      edad INTEGER,
      adoptada BOOLEAN
    )
  `;

  constructor(private sqlite: SQLite) {
    this.initDB();
  }

  private async initDB() {
    try {
      this.database = await this.sqlite.create({
        name: 'adopciones.db',
        location: 'default',
      });
      await this.database.executeSql(this.petsTable, []);
    } catch (error) {
      console.error('Error al inicializar la base de datos', error);
    }
  }

  // Obtener todas las mascotas
  async getPets(): Promise<any[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM pets', []);
      const pets = [];
      for (let i = 0; i < result.rows.length; i++) {
        pets.push(result.rows.item(i));
      }
      return pets;
    } catch (error) {
      console.error('Error al obtener mascotas', error);
      return [];
    }
  }

  // Agregar una nueva mascota
  async addPet(nombre: string, especie: string, edad: number, adoptada: boolean): Promise<void> {
    try {
      const query = `INSERT INTO pets (nombre, especie, edad, adoptada) VALUES (?, ?, ?, ?)`;
      await this.database.executeSql(query, [nombre, especie, edad, adoptada ? 1 : 0]);
    } catch (error) {
      console.error('Error al agregar mascota', error);
    }
  }

  // Eliminar una mascota por su ID
  async deletePet(id: number): Promise<void> {
    try {
      const query = `DELETE FROM pets WHERE id = ?`;
      await this.database.executeSql(query, [id]);
    } catch (error) {
      console.error('Error al eliminar mascota', error);
    }
  }

  // Actualizar el estado de adopción de una mascota
  async updateAdoptionStatus(id: number, adoptada: boolean): Promise<void> {
    try {
      const query = `UPDATE pets SET adoptada = ? WHERE id = ?`;
      await this.database.executeSql(query, [adoptada ? 1 : 0, id]);
    } catch (error) {
      console.error('Error al actualizar estado de adopción', error);
    }
  }
}
