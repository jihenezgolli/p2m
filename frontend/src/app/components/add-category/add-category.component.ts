import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoriesServ: CategoriesService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    this.categoryForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  onSubmit() {
    this.categoriesServ.add(this.categoryForm.value);
    this.categoryForm.reset();
  }

}
