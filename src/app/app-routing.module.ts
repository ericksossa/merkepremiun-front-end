import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: '**', component: NopagefoundComponent }


];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
