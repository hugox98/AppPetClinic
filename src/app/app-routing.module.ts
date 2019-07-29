import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/:id', loadChildren: './home/home.module#HomePageModule' },  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'citas/:id', loadChildren: './citas/citas.module#CitasPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
