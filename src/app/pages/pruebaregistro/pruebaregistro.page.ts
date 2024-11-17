import { Component, OnInit } from '@angular/core';
import { BasedatosService } from 'src/app/services/basedatos.service';

@Component({
  selector: 'app-pruebaregistro',
  templateUrl: './pruebaregistro.page.html',
  styleUrls: ['./pruebaregistro.page.scss'],
})
export class PruebaregistroPage implements OnInit {

  usuarios: any[] = [];

  constructor(private bdService: BasedatosService) { }

  async ngOnInit() {
    try {
      await this.bdService.abrirBaseDatos();
      this.usuarios = await this.bdService.obtenerUsuarios();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

}
