import { Injectable } from '@angular/core';
import { Daradopcion } from './daradopcion.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  public database!: SQLiteObject;

  tablaDaradopcion: string = "CREATE TABLE IF NOT EXISTS daradopcion(idsolicitud INTEGER PRIMARY KEY autoincrement, nombre_persona VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, edad_persona NUMBER NOT NULL, telefono VARCHAR(9) NOT NULL, nombre_mascota VARCHAR(50) NOT NULL, edad_mascota VARCHAR(20) NOT NULL, vacunas_mascotas VARCHAR(100) NOT NULL, problemas_salud VARCHAR(100) NOT NULL, historia_mascota VARCHAR(200) NOT NULL, foto TXT);";

  tablaUsuarios: string = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
`;

  constructor(private sqlite: SQLite) { }

  async abrirBaseDatos() {
    try{this.database = await this.sqlite.create({
      name: 'adopcion.db',
      location: 'default'
    });

    console.log('base de datos abierta con exito');
    await this.database.executeSql(this.tablaDaradopcion, []);
    console.log('tabal creada/varificada con exito');
  } catch (error){
    console.error('error al abrir la base de datos')
  }

    
    await this.database.executeSql(this.tablaUsuarios, []);
  }

  async registrarUsuario(email: string, password: string) {
    const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;
    try {
      await this.database.executeSql(sql, [email, password]);
      console.log('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async obtenerUsuarios() {
    const sql = 'SELECT * FROM usuarios';
    try {
      const resultado = await this.database.executeSql(sql, []);
      let usuarios = [];
      for (let i = 0; i < resultado.rows.length; i++) {
        usuarios.push(resultado.rows.item(i));
      }
      return usuarios;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return [];
    }
  }

  async validarUsuario(email: string, password: string): Promise<boolean> {
    const sql = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
    const result = await this.database.executeSql(sql, [email, password]);

    // Retorna verdadero si se encuentra un usuario
    return result.rows.length > 0;
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
