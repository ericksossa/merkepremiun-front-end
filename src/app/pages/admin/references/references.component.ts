import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/references/reference.service';
import { Reference } from '../../../models/reference.model';
import swal from 'sweetalert2';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styles: []
})
export class ReferencesComponent implements OnInit {
  references: any[] = [];
  categories: Category[] = [];
  selectReference = new Reference();
  constructor(private referecesService: ReferenceService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.allReferences();
    this.allCategories();
  }

  allReferences() {
    this.referecesService.allReferences()
      .subscribe(resp => this.references = resp.data);
  }

  allCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => this.categories = resp.data);
  }


  openEdit(reference: any) {
    this.selectReference = reference;
  }

  onDelete(reference: any) {
    this.referecesService.deleteCategory(reference.id, reference)
      .subscribe(resp => {
        this.allReferences();
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

  onSave(reference: any) {
    if (!this.selectReference.id) {
      // save
      console.log(reference.value);

      this.referecesService.createReferences(reference.value)
        .subscribe(resp => {
          this.allReferences();
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
      this.referecesService.updateReferences(this.selectReference.id, reference.value)
        .subscribe(resp => {
          this.allReferences();
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
