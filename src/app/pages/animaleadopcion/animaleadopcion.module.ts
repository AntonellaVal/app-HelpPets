import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimaleadopcionPageRoutingModule } from './animaleadopcion-routing.module';

import { AnimaleadopcionPage } from './animaleadopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimaleadopcionPageRoutingModule
  ],
  declarations: [AnimaleadopcionPage]
})
export class AnimaleadopcionPageModule {}
