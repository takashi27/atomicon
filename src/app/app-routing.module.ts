import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VotacionesComponent } from './components/votaciones/votaciones.component';

const routes: Routes = [
  {path: 'Home' , component: HomeComponent},
  {path: 'Votaciones' , component: VotacionesComponent},
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: '**', pathMatch: 'full', redirectTo: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
