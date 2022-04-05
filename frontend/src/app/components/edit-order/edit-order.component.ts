import { Component, OnInit, Inject } from '@angular/core';
import { CartItems } from 'src/app/models/cartItems.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  editForm: FormGroup;
  id: string;
  order: CartItems;

  constructor(private formBuilder: FormBuilder, private cartServ: CartService, private dialogRef: MatDialogRef<EditOrderComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.loadSingleData();
    this.initForm();
  }

  private loadSingleData() {
    this.cartServ.getSingleOrder(this.id).subscribe(
      res => {
        this.order = res['order'];
        this.editForm.patchValue({
          'total': this.order.total
        });
      }
    );
  }

  private initForm(){
    this.editForm = this.formBuilder.group({
      'total': [null, Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.editForm.value);
  }

}
