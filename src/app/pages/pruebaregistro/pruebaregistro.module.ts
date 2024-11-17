import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaregistroPageRoutingModule } from './pruebaregistro-routing.module';

import { PruebaregistroPage } from './pruebaregistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaregistroPageRoutingModule
  ],
  declarations: [PruebaregistroPage]
})
export class PruebaregistroPageModule {}
