import { Component } from '@angular/core';
import { BasedatosService } from './services/basedatos.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private bdService: BasedatosService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.bdService.abrirBaseDatos();
    });
  }
  
}
