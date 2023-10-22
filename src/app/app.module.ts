import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { FractalpageComponent } from './pages/fractalpage/fractalpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    FractalpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
