import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ProductService } from '../../../services/product/product.service';
import { ProductsModel } from '../../../models/product.model';
import { ReferenceService } from 'src/app/services/service.index';

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
  constructor(private productService: ProductService,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.allProducts();
    this.allReferences();
  }

  openEdit(product: any) {
    this.selectProduct = product;
  }

  allProducts() {
    this.productService.allProduct()
      .subscribe(resp => this.products = resp.data);
  }

  allReferences() {
    this.referenceService.allReferences()
      .subscribe(resp => this.references = resp.data);
  }

  onDelete(product: any) {
    this.productService.deleteProduct(product.id)
      .subscribe(resp => {
        this.allProducts();
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


  onSave(product: any) {
    if (!this.selectProduct.id) {
      // save
      console.log(product.value);

      this.productService.createProduct(product.value, this.uploadImage)
        .subscribe(resp => {
          this.allProducts();
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

    } else {
      // edit
      this.productService.updateProducts(this.selectProduct.id, product.value)
        .subscribe(resp => {
          this.allProducts();
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

  }

}
