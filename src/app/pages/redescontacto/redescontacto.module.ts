import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedescontactoPageRoutingModule } from './redescontacto-routing.module';

import { RedescontactoPage } from './redescontacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedescontactoPageRoutingModule
  ],
  declarations: [RedescontactoPage]
})
export class RedescontactoPageModule {}
