import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { ReferenceService } from '../../services/references/reference.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  references: any[] = [];
  constructor(private categoriesService: CategoriesService,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getCategories();
    this.getReferences();
  }

  getCategories() {
    this.categoriesService.allCategories()
      .subscribe(resp => this.categories = resp.data);
  }

  getReferences() {
    this.referenceService.allReferences()
      .subscribe(resp => this.references = resp.data);
  }



}
