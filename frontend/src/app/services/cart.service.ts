import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { CartItems } from '../models/cartItems.model';
import { Products } from '../models/products.model';
import { apiUrl } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderDetailsChanged = new Subject<CartItems[]>();
  private orderDetails: CartItems[] = [];
  ordersChanged = new Subject<CartItems[]>();
  private orders: CartItems[] = [];
  itemsChanged = new Subject<Products[]>();
  private items: Products[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  setCart(items) {
    sessionStorage.setItem('sessionCartItems', JSON.stringify(items));
    this.items = JSON.parse(sessionStorage.getItem('sessionCartItems'));
    this.itemsChanged.next(this.items);
  }

  clearCart() {
    sessionStorage.removeItem('sessionCartItems');
    this.items = JSON.parse(sessionStorage.getItem('sessionCartItems'));
    this.itemsChanged.next(this.items);
  }

  setOrderDetails(orderDetails: CartItems[]) {
    this.orderDetails = orderDetails;
    this.orderDetailsChanged.next(this.orderDetails);
  }

  setOrders(orders: CartItems[]) {
    this.orders = orders;
    this.ordersChanged.next(this.orders);
  }

  addOrder(data) {
    return this.http.post('apiUIrl:8000/api/order', data);
  }

  addOrderDetails(data) {
    return this.http.post('apiUIrl:8000/api/orderDetail', data);
  }

  getAllOrders() {
    return this.http.get('apiUIrl:8000/api/order');
  }

  getAllOrderDetails() {
    return this.http.get('apiUIrl:8000/api/orderDetail');
  }

  deleteOrder(id, index) {
    this.http.delete('apiUIrl:8000/api/order/'+id).subscribe(
      res => {
        this.snackBar.open('Deleted', 'Dismiss', {duration: 3000});
        this.orders.splice(index, 1);
        this.ordersChanged.next(this.orders);
      }
    );
  }

  deleteOrderDetail(id, index) {
    this.http.delete('apiUIrl:8000/api/orderDetail/'+id).subscribe(
      res => {
        this.snackBar.open('Deleted', 'Dismiss', {duration: 3000});
        this.orderDetails.splice(index, 1);
        this.orderDetailsChanged.next(this.orderDetails);
      }
    );
  }

  editOrder(data, id, index) {
    this.http.put('apiUIrl:8000/api/order/'+id, data).subscribe(
      res => {
        this.snackBar.open('Edited', 'Dismiss', {duration: 3000});
        this.orders[index] = res['order'];
        this.orderDetailsChanged.next(this.orders);
      }
    );
  }

  editOrderDetail(data, id, index) {
    this.http.put('apiUIrl:8000/api/orderDetail/'+id, data).subscribe(
      res => {
        this.snackBar.open('Edited', 'Dismiss', {duration: 3000});
        this.orderDetails[index] = res['orderDetail'];
        this.orderDetailsChanged.next(this.orderDetails);
      }
    );
  }

  getSingleOrder(id) {
    return this.http.get('apiUIrl:8000/api/order/'+id+'/edit');
  }

  getSingleOrderDetail(id) {
    return this.http.get('apiUIrl:8000/api/orderDetail/'+id+'/edit');
  }

  getUsersOrders(userId) {
    return this.http.get('apiUIrl:8000/api/order/'+userId);
  }

  getUsersOrderDetails(orderId) {
    return this.http.get('apiUIrl:8000/api/orderDetail/'+orderId);
  }

}
