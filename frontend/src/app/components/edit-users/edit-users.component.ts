import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  editForm: FormGroup;
  id: string;
  user: Users;

  constructor(private formBuilder: FormBuilder, private usersServ: UsersService, private dialogRef: MatDialogRef<EditUsersComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.loadSingleData();
    this.initForm();
  }

  private loadSingleData() {
    this.usersServ.getSingleUsers(this.id).subscribe(
      res => {
        this.user = res['user'];
        this.editForm.patchValue({
          'name': this.user.name,
          'email': this.user.email,
          'contact': this.user.contact,
          'address': this.user.address
        });
      }
    );
  }

  private initForm(){
      this.editForm = this.formBuilder.group({
        'name': [null, Validators.required],
        'email': [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required, Validators.minLength(6)]],
        'contact': [null, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
        'address': [null]
      });
  }

  onSubmit() {
    this.dialogRef.close(this.editForm.value);
  }

}
