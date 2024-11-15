import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedescontactoPage } from './redescontacto.page';

const routes: Routes = [
  {
    path: '',
    component: RedescontactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedescontactoPageRoutingModule {}
