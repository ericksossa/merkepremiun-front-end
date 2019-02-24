import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ProductsModel } from '../../../models/product.model';
import { ReferenceService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../../config/config';

declare var $: any;
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styles: []
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];
  references: any[] = [];
  selectProduct = new ProductsModel();
  uploadImage: any;
  img: any;
  path: any;
  isChecked: boolean;
  submitted = false;

  constructor(
    private productService: ProductService,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getProducts();
    this.getReferences();
  }

  openEdit(product: any) {
    this.selectProduct = product;
    console.log(this.selectProduct);
  }

  getProducts() {
    this.productService.allProduct()
      .subscribe(resp => this.products = resp.data);
  }

  getReferences() {
    this.referenceService.allReferences()
      .subscribe(resp => this.references = resp.data);
  }

  onDelete(product: any) {
    this.productService.deleteProduct(product.id)
      .subscribe(resp => {
        this.getProducts();
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000
        });
        Toast.fire({
          type: 'success',
          title: `${resp.message}`,
        });
      });
  }

  // obtiene el archivo de img
  readUrl(archive: File) {
    if (!archive) {
      return;
    }
    this.uploadImage = archive;
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.img = event.target.result;
    };
    reader.readAsDataURL(archive);
  }

  changed(event: any) {
    this.isChecked = event;
  }

  onSave(product: any) {
    this.submitted = true;
    console.log(product.value);
    if (!product.valid) {
      return;
    }

    if (!this.selectProduct.id) {
      // save
      this.productService.createProduct(product.value, this.uploadImage)
        .subscribe(resp => {
          this.getProducts();
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000
          });
          Toast.fire({
            type: 'success',
            title: `${resp.message}`,
          });
          // clear de los campos del frm
          product.reset({
            name: '',
            price: '',
            referenceId: '',
            stock: '',
            recommended: ''
          });
          this.submitted = false;
        }, err => {
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000
          });
          Toast.fire({
            type: 'error',
            title: `${err.error.message}`,
          });
        });

    } else {
      // edit
      this.productService.updateProducts(this.selectProduct.id, product.value)
        .subscribe(resp => {
          this.getProducts();
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000
          });
          Toast.fire({
            type: 'success',
            title: `${resp.message}`,
          });
          // clear de los campos del frm
          product.reset({
            name: '',
            price: '',
            referenceId: '',
            stock: '',
            recommended: ''
          });
          this.submitted = false;
          this.selectProduct.id = null;
        }, err => {
          const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000
          });
          Toast.fire({
            type: 'error',
            title: `${err.error.message}`,
          });
        });
    }

  }

  // vista previa de la img
  onImage(p: any) {
    this.path = URL_SERVICES + `api/v1/product/allimages/${p}`;
    $('#myModal').modal('show');
  }

}
