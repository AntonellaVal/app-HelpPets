import { Injectable } from '@angular/core';
import { Daradopcion } from './daradopcion.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  public database!: SQLiteObject;

  tablaDaradopcion: string = "CREATE TABLE IF NOT EXISTS daradopcion(idsolicitud INTEGER PRIMARY KEY autoincrement, nombre_persona VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, edad_persona NUMBER NOT NULL, telefono VARCHAR(9) NOT NULL, nombre_mascota VARCHAR(50) NOT NULL, edad_mascota VARCHAR(20) NOT NULL, vacunas_mascotas VARCHAR(100) NOT NULL, problemas_salud VARCHAR(100) NOT NULL, historia_mascota VARCHAR(200) NOT NULL, foto TXT);";

  constructor(private sqlite: SQLite) { }

  async abrirBaseDatos() {
    this.database = await this.sqlite.create({
      name: 'adopcion.db',
      location: 'default'
    });

    await this.database.executeSql(this.tablaDaradopcion, []);
  }

  async agregarSolicitud(daradopcion: Daradopcion) {
    const sql = `INSERT INTO daradopcion 
      (nombre_persona, email, edad_persona, telefono, nombre_mascota, edad_mascota, vacunas_mascotas, problemas_salud, historia_mascota, foto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valores = [
      daradopcion.nombre_persona,
      daradopcion.email,
      daradopcion.edad_persona,
      daradopcion.telefono,
      daradopcion.nombre_mascota,
      daradopcion.edad_mascota,
      daradopcion.vacunas_mascotas,
      daradopcion.problemas_salud,
      daradopcion.historia_mascota,
      daradopcion.foto
    ];
    

    return this.database.executeSql(sql, valores);
  }
}
