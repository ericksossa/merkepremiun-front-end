import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// paginación
import { NgxPaginationModule } from 'ngx-pagination';
// pages
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ReferencesComponent } from './admin/references/references.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './admin/customers/customers.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    ProductComponent,
    ContactComponent,
    CategoriesComponent,
    ReferencesComponent,
    AdminProductComponent,
    ModalComponent,
    CartComponent,
    CustomersComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: []
})
export class PagesModule { }
