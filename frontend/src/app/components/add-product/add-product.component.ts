import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: Categories[];
  productForm: FormGroup;
  imgChg: File;

  constructor(private categoriesServ: CategoriesService, private formBuilder: FormBuilder, private productsServ: ProductService) { }

  ngOnInit() {
    this.initForm();
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
      }
    );
  }

  private initForm(){
    this.productForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'categoryId': [null, Validators.required],
      'price': [null, [Validators.required, Validators.minLength(6)]],
      'description': [null],
      'imageFile': [null],
    });
  }

  imageChange(event){
    this.imgChg = event.target.files[0];
  }

  onSubmit(){
    if(this.imgChg != null){
      const fd = new FormData();
      fd.append('imageFile', this.imgChg, this.imgChg.name);
      fd.append('name', this.productForm.get('name').value);
      fd.append('categoryId', this.productForm.get('categoryId').value);
      fd.append('price', this.productForm.get('price').value);
      fd.append('description', this.productForm.get('description').value);
      this.productsServ.add(fd);
      this.imgChg = null;
    } else {
      const fd = new FormData();
      fd.append('name', this.productForm.get('name').value);
      fd.append('categoryId', this.productForm.get('categoryId').value);
      fd.append('price', this.productForm.get('price').value);
      fd.append('description', this.productForm.get('description').value);
      this.productsServ.add(fd);
    }
    this.productForm.reset();
  }

}