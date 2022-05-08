import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Categories[];

  constructor(private categoriesServ: CategoriesService) { }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
      }
    );
  }

}