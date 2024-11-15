import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormdaradopcionPageRoutingModule } from './formdaradopcion-routing.module';

import { FormdaradopcionPage } from './formdaradopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormdaradopcionPageRoutingModule
  ],
  declarations: [FormdaradopcionPage]
})
export class FormdaradopcionPageModule {}
