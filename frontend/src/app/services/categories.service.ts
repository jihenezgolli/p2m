import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from '../models/categories.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesChanged = new Subject<Categories[]>();
  private categories: Categories[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  add(data){
    this.http.post('http://localhost:8000/api/category', data).subscribe(
      res => {
        if(res['category'] == null){
          this.snackBar.open('Title already exists', 'Dismiss', {duration: 3000});
        } else {
          this.categories.push(res['category']);
          this.categoriesChanged.next(this.categories);
          this.snackBar.open('Data inserted successfully', 'Dismiss', {duration: 3000});
        }
      }
    );
  }

  setCategories(categories: Categories[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories);
  }

  getAllCategories(){
    return this.http.get('http://localhost:8000/api/category');
  }

  getSingleCategories(id){
    return this.http.get('http://localhost:8000/api/category/'+id+'/edit');
  }

  delete(id, index) {
    this.http.delete('http://localhost:8000/api/category/'+id).subscribe(
      res => {
        this.snackBar.open('Deleted', 'Dismiss', {duration: 3000});
        this.categories.splice(index, 1);
        this.categoriesChanged.next(this.categories);
      }
    );
  }

  edit(data, id, index) {
    this.http.put('http://localhost:8000/api/category/'+id, data).subscribe(
      res => {
        this.snackBar.open('Edited', 'Dismiss', {duration: 3000});
        this.categories[index] = res['category'];
        this.categoriesChanged.next(this.categories);
      }
    );
  }

}