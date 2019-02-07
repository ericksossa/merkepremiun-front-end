import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// pages
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CategoriesComponent } from './admin/categories/categories.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    ProductComponent,
    ContactComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class PagesModule { }
