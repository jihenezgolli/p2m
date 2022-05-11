import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators , ReactiveFormsModule} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  sessionUserId: number = JSON.parse(sessionStorage.sessionUserData).id;
  user: Users = {id : 1 , name: "", email: "", password: "", address: "",userType: "" , contact: 99999999};
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private usersServ: UsersService) { }

  ngOnInit() {

    

    this.subscription = this.usersServ.accountChanged.subscribe(
      (user: Users) => {
        this.user = user;
        this.accountForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          contact: this.user.contact,
          address: this.user.address
        });
      }
    );
    this.loadSingleData();
    this.initForm();
  }

  private initForm(){
    this.accountForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'contact': [null, Validators.pattern(/^\d{8}$/)],
      'address': [null]
    });
  }

  private loadSingleData() {
    this.usersServ.getSingleUsers(this.sessionUserId).subscribe(
      res => {
        this.user = res['user'];
        this.accountForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          contact: this.user.contact,
          address: this.user.address
        });
      }
    );
  }

  onSubmit(){
    this.usersServ.editAccount(this.accountForm.value, this.sessionUserId);
    this.accountForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
