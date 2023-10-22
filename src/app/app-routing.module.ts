import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FractalpageComponent } from './pages/fractalpage/fractalpage.component';


const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: 'fractals', component: FractalpageComponent},
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' }, // Redirect to Page 1 on initial load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
