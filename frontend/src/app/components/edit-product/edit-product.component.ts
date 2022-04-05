import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/models/categories.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categories: Categories[];
  product: Products;
  id: string;
  editForm: FormGroup;
  imgChg: File;

  constructor(private categoriesServ: CategoriesService, private productServ: ProductService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.initForm();
    this.loadCategories();
    this.loadSingleProduct();
  }

  private loadCategories() {
    this.categoriesServ.getAllCategories().subscribe(
      res => {
        this.categories = res['categories'];
      }
    );
  }

  private loadSingleProduct() {
    this.productServ.getSingleProduct(this.id).subscribe(
      res => {
        this.product = res['product'];
        this.editForm.patchValue({
          'name': this.product.name,
          'categoryId': this.product.categoryId,
          'price': this.product.price,
          'description': this.product.description
        });
      }
    );
  }

  private initForm(){
    this.editForm = this.formBuilder.group({
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
      fd.append('name', this.editForm.get('name').value);
      fd.append('categoryId', this.editForm.get('categoryId').value);
      fd.append('price', this.editForm.get('price').value);
      fd.append('description', this.editForm.get('description').value);
      this.dialogRef.close(fd);
      this.imgChg = null;
    } else {
      const fd = new FormData();
      fd.append('name', this.editForm.get('name').value);
      fd.append('categoryId', this.editForm.get('categoryId').value);
      fd.append('price', this.editForm.get('price').value);
      fd.append('description', this.editForm.get('description').value);
      this.dialogRef.close(fd);
    }
  }

}