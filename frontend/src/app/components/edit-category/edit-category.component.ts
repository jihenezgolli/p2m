import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/models/categories.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editForm: FormGroup;
  id: string;
  category: Categories;

  constructor(private formBuilder: FormBuilder, private categoriesServ: CategoriesService, private dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.loadSingleData();
    this.initForm();
  }

  private loadSingleData() {
    this.categoriesServ.getSingleCategories(this.id).subscribe(
      res => {
        this.category = res['category'];
        this.editForm.patchValue({
          'title': this.category.title,
          'description': this.category.description
        });
      }
    );
  }

  private initForm(){
    this.editForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.editForm.value);
  }

}
