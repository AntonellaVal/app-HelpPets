import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaanimalesPage } from './fichaanimales.page';

const routes: Routes = [
  {
    path: '',
    component: FichaanimalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaanimalesPageRoutingModule {}
