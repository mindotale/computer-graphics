import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FractalpageComponent } from './pages/fractalpage/fractalpage.component';
import { ColorpageComponent } from './pages/colorpage/colorpage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { LearnpageComponent } from './pages/learnpage/learnpage.component';
import { FigurespageComponent } from './pages/figurespage/figurespage.component';
import { VicsekFractalComponent } from './pages/fractalpage/vicsek-fractal/vicsek-fractal.component';
import { NewtonFractalComponent } from './pages/fractalpage/newton-fractal/newton-fractal.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: 'fractals', component: FractalpageComponent},
  { path: 'color-schemas', component: ColorpageComponent},
  { path: 'figure-transformation', component: FigurespageComponent},
  { path: 'about-us', component: AboutpageComponent},
  { path: 'learn-more', component: LearnpageComponent},
  { path: 'vicsek-fractal', component: VicsekFractalComponent},
  { path: 'newton-fractal', component: NewtonFractalComponent},
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' }, // Redirect to Page 1 on initial load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
