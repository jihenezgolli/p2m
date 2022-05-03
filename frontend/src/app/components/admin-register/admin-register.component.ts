import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service'; 

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersServ: UsersService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    this.registrationForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'userType': ['user', Validators.required],
      'contact': [null, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
      'address': [null]
    });
  }

  onSubmit(){
    this.usersServ.register(this.registrationForm.value);
    this.registrationForm.reset();
  }

}
