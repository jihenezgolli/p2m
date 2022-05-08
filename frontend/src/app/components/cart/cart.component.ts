import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users.model';
import { CartItems } from 'src/app/models/cartItems.model';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  items: Products[] = JSON.parse(sessionStorage.getItem('sessionCartItems'));
  products: Products[] = this.items;
  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete'];
  dataSource: MatTableDataSource<Products>;
  total: number;
  sessionUserData: Users = JSON.parse(sessionStorage.getItem('sessionUserData'));
  order: CartItems;
  subscription: Subscription;

  constructor(private cartServ: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.cartServ.itemsChanged.subscribe(
      (items: Products[]) => {
        this.items = items;
        this.products = this.items;
      }
    );
  }

  getTotalPrice() {
    return this.total = this.products.map(tp => tp.price * tp.quantity).reduce((acc, value) => acc + value, 0);
  }

  quantityChange(i, event) {
    if(event.target.value == "") {
      event.target.value = 1;
      this.products[i].quantity = event.target.value;
    } else {
      this.products[i].quantity = event.target.value;
    }
  }

  delete(i) {
    var flag = confirm("Do you want to delete?");
    if (flag) {
      this.items.splice(i, 1);
      this.cartServ.setCart(this.items);
      if (this.items.length == 0) {
        this.cartServ.clearCart();
        this.items = null;
        this.products = this.items;
      } else {
        this.products = this.items;
      }
    }
  }

  clear() {
    var flag = confirm("Do you want to clear cart?");
    if (flag) {
      this.cartServ.clearCart();
      this.items = null;
      this.products = this.items;
    }    
  }

  checkout() {
    this.order = {id: null, userId: this.sessionUserData.id, total: this.total};
    this.cartServ.addOrder(this.order).subscribe(
      res => {
        for(let i = 0; i < this.products.length; i++) {
          this.products[i].orderId = res['order'].id;
          this.cartServ.addOrderDetails(this.products[i]).subscribe(
            res => {
              if(i == (this.products.length - 1)) {
                this.snackBar.open('Order details saved successfully', 'Dismiss', {duration: 3000});
                this.cartServ.clearCart();
                this.items = null;
                this.products = this.items;
              }
            }
          );
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}