import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/models/cartItems.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  sessionUserId: number = JSON.parse(sessionStorage.sessionUserData).id;
  user: Users;
  subscription: Subscription;
  orders: CartItems[] = [];
  displayedOrdersColumns: string[] = ['id', 'total', 'date'];
  ordersDataSource: MatTableDataSource<CartItems>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  orderDetails: CartItems[] = [];
  displayedOrderDetailsColumns: string[] = ['id', 'orderId', 'productName', 'quantity'];
  orderDetailsDataSource: MatTableDataSource<CartItems>;

  constructor(private formBuilder: FormBuilder, private usersServ: UsersService, private cartServ: CartService) { }

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
    this.loadSingleUser();
    this.initForm();
    this.loadOrders();
  }

  private initForm(){
    this.accountForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'contact': [null, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
      'address': [null]
    });
  }

  private loadSingleUser() {
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

  private loadOrders() {
    this.cartServ.getUsersOrders(this.sessionUserId).subscribe(
      res => {
        this.orders = res['orders'];
        this.ordersDataSource = new MatTableDataSource(this.orders);
        this.ordersDataSource.paginator = this.paginator;
        this.ordersDataSource.sort = this.sort;
        for(let i = 0; i < this.orders.length; i++) {
          this.cartServ.getUsersOrderDetails(this.orders[i].id).subscribe(
            res => {
              if(res['orderDetails'] != 0) {
                for(let i = 0; i < res['orderDetails'].length; i++) {
                  this.orderDetails.push(res['orderDetails'][i]);
                }
              }
              this.orderDetailsDataSource = new MatTableDataSource(this.orderDetails);
              this.orderDetailsDataSource.paginator = this.paginator;
              this.orderDetailsDataSource.sort = this.sort;
            }
          );
        }
      }
    );
  }

  applyOrdersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ordersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ordersDataSource.paginator) {
      this.ordersDataSource.paginator.firstPage();
    }
  }

  applyOrderDetailsFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDetailsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orderDetailsDataSource.paginator) {
      this.orderDetailsDataSource.paginator.firstPage();
    }
  }

  onSubmit(){
    this.usersServ.editAccount(this.accountForm.value, this.sessionUserId);
    this.accountForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
