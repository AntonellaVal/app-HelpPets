import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaregistroPage } from './pruebaregistro.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaregistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaregistroPageRoutingModule {}
