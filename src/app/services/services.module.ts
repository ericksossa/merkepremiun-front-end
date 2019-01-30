import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** importacion del index Service
que contiene todos los servicios**/
import {
  UsersService,
  GuardsGuard,
} from '../services/service.index';

@NgModule({
  providers: [
    UsersService,
    GuardsGuard
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
