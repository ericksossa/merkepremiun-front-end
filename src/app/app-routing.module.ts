import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ReferencesComponent } from './pages/admin/references/references.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'admin/categories', component: CategoriesComponent },
  { path: 'admin/references', component: ReferencesComponent },
  { path: 'admin/products', component: AdminProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  // { path: '**', component: NopagefoundComponent }


];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
