import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/** importacion del index Service
que contiene todos los servicios**/
import {
  UsersService,
  GuardsGuard,
  AuthService
} from '../services/service.index';

@NgModule({
  providers: [
    UsersService,
    GuardsGuard,
    AuthService
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
