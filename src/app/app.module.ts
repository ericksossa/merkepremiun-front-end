import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FiltersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ServicesModule,
    SharedModule
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
