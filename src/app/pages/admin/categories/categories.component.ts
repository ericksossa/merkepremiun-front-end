import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { CategoryModel } from '../../../models/category.model';
import { CategoriesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  submitted = false;
  categories: CategoryModel[] = [];
  selectCategory = new CategoryModel();
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.allCategories();
  }

  allCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => this.categories = resp.data);
  }

  onSave(category: any) {
    this.submitted = true;
    if (!category.valid) {
      return;
    }

    if (!this.selectCategory.id) {
      // save
      this.categoriesService.createCategory(category.value)
        .subscribe(resp => {
          // bien
          this.allCategories();
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
          category.reset();
          this.submitted = false;
        }, err => {
          // error
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
      this.categoriesService.updateCategory(this.selectCategory.id, category.value)
        .subscribe(resp => {
          this.allCategories();
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
          category.reset();
          this.submitted = false;

        }, err => {
          // error
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

  openEdit(category: any) {
    this.selectCategory = category;
  }

  onDelete(category: any) {
    this.categoriesService.deleteCategory(category.id, category)
      .subscribe((resp) => {
        this.allCategories();
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
