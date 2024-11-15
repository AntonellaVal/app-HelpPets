import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimaleadopcionPage } from './animaleadopcion.page';

const routes: Routes = [
  {
    path: '',
    component: AnimaleadopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaleadopcionPageRoutingModule {}
