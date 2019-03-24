import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ProductsModel } from '../../../models/product.model';
import { ReferenceService } from 'src/app/services/service.index';
import { URL_SERVICES } from '../../../config/config';
import { OPTIONS, TEXT } from 'src/app/models/optionscropper.model';

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
  // opciones del cropper
  options = OPTIONS;
  text = TEXT;
  imgSrc: any = [];

  constructor(
    private productService: ProductService,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getProducts();
    this.getReferences();
  }

  openEdit(product: any) {
    this.selectProduct = product;
  }

  getProducts() {
    this.productService.allProduct()
      .subscribe(resp => {
        console.log(resp.data);
        this.products = resp.data;
      });
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

  onSelect($event: any) {
    this.imgSrc = [];
    switch (typeof ($event)) {
      case 'string':
        this.imgSrc = [$event];
        fetch($event).then(res => res.blob()).then(blob => {
          this.uploadImage = blob;
        });
        break;
      case 'object':
        this.imgSrc = $event;
        break;
      default:
    }
  }

  reset() {
    this.imgSrc = [];
  }

  changed(event: any) {
    this.isChecked = event;
  }

  onSave(product: any) {
    this.submitted = true;
    if (!product.valid) {
      return;
    }

    if (!this.selectProduct.id) {
      // save
      if (!this.uploadImage) {
        // validate
        swal.fire('Importante', 'Debes seleccionar una imagen a subir', 'warning');
        return;
      }

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
            unitprice: '',
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
            unitprice: '',
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
