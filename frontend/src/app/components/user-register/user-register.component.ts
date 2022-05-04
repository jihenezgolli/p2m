import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.registrationForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'contact': [null, Validators.pattern(/^\d{8}$/)],
      'address': [null]
    });
  }

  onSubmit(){
    //this.usersServ.register(this.registrationForm.value);
    this.registrationForm.reset();
  }

}
