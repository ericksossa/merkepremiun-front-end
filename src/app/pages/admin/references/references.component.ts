import { Component, OnInit } from '@angular/core';
import { ReferenceModel } from '../../../models/reference.model';
import swal from 'sweetalert2';
import { CategoryModel } from '../../../models/category.model';
import { ReferenceService, CategoriesService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styles: []
})
export class ReferencesComponent implements OnInit {
  references: any[] = [];
  categories: CategoryModel[] = [];
  selectReference = new ReferenceModel();
  submitted = false;
  constructor(private referecesService: ReferenceService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getReferences();
    this.getCategories();
  }

  getReferences() {
    this.referecesService.allReferences()
      .subscribe(resp => {
        console.log(resp);
        this.references = resp.data;
      });
  }

  getCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => this.categories = resp.data);
  }

  openEdit(reference: any) {
    this.selectReference = reference;
  }

  onDelete(reference: any) {
    this.referecesService.deleteCategory(reference.id, reference)
      .subscribe(resp => {
        this.getReferences();
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

  onSave(reference: NgForm) {
    this.submitted = true;
    if (!reference.valid) {
      return;
    }

    if (!this.selectReference.id) {
      // save
      this.referecesService.createReferences(reference.value)
        .subscribe(resp => {
          this.getReferences();
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
          reference.reset({
            categoryId: '',
            name: ''
          });
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
      this.referecesService.updateReferences(this.selectReference.id, reference.value)
        .subscribe(resp => {
          this.getReferences();
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
          reference.reset({
            categoryId: '',
            name: ''
          });
          this.submitted = false;
          this.selectReference.id = null;
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

}
