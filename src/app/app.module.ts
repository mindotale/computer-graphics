import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FractalpageComponent } from './pages/fractalpage/fractalpage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ColorpageComponent } from './pages/colorpage/colorpage.component';
import { LearnpageComponent } from './pages/learnpage/learnpage.component';
import { FigurespageComponent } from './pages/figurespage/figurespage.component';
import { VicsekFractalComponent } from './pages/fractalpage/vicsek-fractal/vicsek-fractal.component';
import { NewtonFractalComponent } from './pages/fractalpage/newton-fractal/newton-fractal.component';
import { GraphComponent } from './pages/figurespage/graph/graph.component';
import { NewtonlearnComponent } from './newtonlearn/newtonlearn.component';
import { ViesceklearnComponent } from './viesceklearn/viesceklearn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    FractalpageComponent,
    AboutpageComponent,
    ColorpageComponent,
    LearnpageComponent,
    FigurespageComponent,
    VicsekFractalComponent,
    NewtonFractalComponent,
    GraphComponent,
    NewtonlearnComponent,
    ViesceklearnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
