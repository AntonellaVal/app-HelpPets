import { Injectable } from '@angular/core';
import { Daradopcion } from './daradopcion.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  public database!: SQLiteObject;

  tablaDaradopcion: string = "CREATE TABLE daradopcion(idsolicitud INTEGER PRIMARY KEY autoincrement, nombre_persona VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, edad_persona NUMBER NOT NULL, telefono VARCHAR(9) NOT NULL, nombre_mascota VARCHAR(50) NOT NULL, edad_mascota VARCHAR(20) NOT NULL, especie VARCHAR(10) NOT NULL , vacunas_mascotas VARCHAR(100) NOT NULL, problemas_salud VARCHAR(100) NOT NULL, historia_mascota VARCHAR(200) NOT NULL, foto TEXT);";

  tablaUsuarios: string = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;
  constructor(private sqlite: SQLite, private alertController: AlertController) { }

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

  async registrarUsuario(email: string, password: string): Promise<void> {
    const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;
    await this.database.executeSql(sql, [email, password]);
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
    return result.rows.length > 0;
  }


  async agregarSolicitud(daradopcion: Daradopcion) {
    const sql = `INSERT INTO daradopcion 
      (nombre_persona, email, edad_persona, telefono, nombre_mascota, edad_mascota, especie, vacunas_mascotas,  problemas_salud, historia_mascota, foto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valores = [
      daradopcion.nombre_persona,
      daradopcion.email,
      daradopcion.edad_persona,
      daradopcion.telefono,
      daradopcion.nombre_mascota,
      daradopcion.edad_mascota,
      daradopcion.especie,
      daradopcion.vacunas_mascotas,
      daradopcion.problemas_salud,
      daradopcion.historia_mascota,
      daradopcion.foto
    ];

    return this.database.executeSql(sql, valores).catch(e=>{
      this.presentAlert("AgregarSolicitud",JSON.stringify(e));
    });
  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['Action'],
    });

    await alert.present();
  }

  async agregarUsuario(email: string, password: string) {
    const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;
    return this.database.executeSql(sql, [email, password]);
  }

  async actualizarPassword(email: string, nuevaPassword: string) {
    const sql = `UPDATE usuarios SET password = ? WHERE email = ?`;
    return this.database.executeSql(sql, [nuevaPassword, email]);
  }

  async obtenerUsuarioPorEmail(email: string) {
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    const resultado = await this.database.executeSql(sql, [email]);
    if (resultado.rows.length > 0) {
      return resultado.rows.item(0); // Devuelve el usuario encontrado
    } else {
      return null; // Retorna null si no encuentra usuario
    }
  }
  
}
