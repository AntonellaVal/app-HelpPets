import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./pages/recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
  {
    path: 'animaleadopcion',
    loadChildren: () => import('./pages/animaleadopcion/animaleadopcion.module').then( m => m.AnimaleadopcionPageModule)
  },
  {
    path: 'formdaradopcion',
    loadChildren: () => import('./pages/formdaradopcion/formdaradopcion.module').then( m => m.FormdaradopcionPageModule)
  },
  {
    path: 'hora',
    loadChildren: () => import('./pages/hora/hora.module').then( m => m.HoraPageModule)
  },
  {
    path: 'fichaanimales',
    loadChildren: () => import('./pages/fichaanimales/fichaanimales.module').then( m => m.FichaanimalesPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  {
    path: 'redescontacto',
    loadChildren: () => import('./pages/redescontacto/redescontacto.module').then( m => m.RedescontactoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'adoptar',
    loadChildren: () => import('./pages/adoptar/adoptar.module').then( m => m.AdoptarPageModule)
  },  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
