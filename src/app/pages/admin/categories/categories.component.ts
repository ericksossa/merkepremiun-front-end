import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import swal from 'sweetalert2';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectCategory = new Category();
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.allCategories();
  }

  allCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => {
        this.categories = resp.data;
      });
  }

  onSave(category: any) {
    if (!this.selectCategory.id) {
      // save
      this.categoriesService.createCategory(category.value)
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
