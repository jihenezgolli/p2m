import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Products } from '../models/products.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsChanged = new Subject<Products[]>();
  private products: Products[] = []

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  add(fd){
    this.http.post('http://localhost:8000/api/product', fd).subscribe(
      res => {
        if(res['product'] == null){
          this.snackBar.open('Name already exists.', 'Dismiss', {duration: 3000});
        } else {
          this.products.push(res['product']);
          this.productsChanged.next(this.products);
          this.snackBar.open('Data inserted successfully.', 'Dismiss', {duration: 3000});
        }
      }
    );
  }

  setProducts(products: Products[]) {
    this.products = products;
    this.productsChanged.next(this.products);
  }

  getAllProducts(){
    return this.http.get('http://localhost:8000/api/product');
  }

  getSingleProduct(id){
    return this.http.get('http://localhost:8000/api/product/'+id);
  }

  delete(id, index) {
    this.http.delete('http://localhost:8000/api/product/'+id).subscribe(
      res => {
        this.snackBar.open('Deleted.', 'Dismiss', {duration: 3000});
        this.products.splice(index, 1);
        this.productsChanged.next(this.products);
      }
    );
  }

  edit(data, id, index) {
    this.http.post('http://localhost:8000/api/product/'+id+'?_method=PUT', data).subscribe(
      res => {
        this.snackBar.open('Edited.', 'Dismiss', {duration: 3000});
        this.products[index] = res['product'];
        this.productsChanged.next(this.products);
      }
    );
  }

}