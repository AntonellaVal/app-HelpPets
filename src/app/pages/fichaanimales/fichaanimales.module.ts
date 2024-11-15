import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaanimalesPageRoutingModule } from './fichaanimales-routing.module';

import { FichaanimalesPage } from './fichaanimales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaanimalesPageRoutingModule
  ],
  declarations: [FichaanimalesPage]
})
export class FichaanimalesPageModule {}
