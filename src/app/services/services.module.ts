import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/** importacion del index Service
que contiene todos los servicios**/
import {
  GuardsGuard,
  AuthService,
  CategoriesService,
  ProductService,
  ReferenceService,
  CartService,
  CustomersService,
  TokenStorageService,
} from '../services/service.index';

@NgModule({
  providers: [
    GuardsGuard,
    AuthService,
    CategoriesService,
    ProductService,
    ReferenceService,
    CartService,
    CustomersService,
    TokenStorageService
  ],
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
