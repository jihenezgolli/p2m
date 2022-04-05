import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItems } from 'src/app/models/cartItems.model';
import { CartService } from 'src/app/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-order-detail',
  templateUrl: './edit-order-detail.component.html',
  styleUrls: ['./edit-order-detail.component.css']
})
export class EditOrderDetailComponent implements OnInit {

  editForm: FormGroup;
  id: string;
  orderDetail: CartItems;

  constructor(private formBuilder: FormBuilder, private cartServ: CartService, private dialogRef: MatDialogRef<EditOrderDetailComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
    this.loadSingleData();
    this.initForm();
  }

  private loadSingleData() {
    this.cartServ.getSingleOrderDetail(this.id).subscribe(
      res => {
        this.orderDetail = res['orderDetail'];
        this.editForm.patchValue({
          'quantity': this.orderDetail.quantity
        });
      }
    );
  }

  private initForm(){
    this.editForm = this.formBuilder.group({
      'quantity': [null, Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.editForm.value);
  }

}
