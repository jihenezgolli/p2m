import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CartItems } from 'src/app/models/cartItems.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit, OnDestroy {

  orders: CartItems[] = [];
  displayedOrderColumns: string[] = ['id', 'userId', 'total', 'edit', 'delete'];
  orderDataSource: MatTableDataSource<CartItems>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private cartServ: CartService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.cartServ.ordersChanged.subscribe(
      (orders: CartItems[]) => {
        this.orders = orders;
        this.orderDataSource = new MatTableDataSource(this.orders);
        this.orderDataSource.paginator = this.paginator;
        this.orderDataSource.sort = this.sort;
      }
    );
    this.loadOrders();
  }

  private loadOrders() {
    this.cartServ.getAllOrders().subscribe(
      res => {
        this.orders = res['orders'];
        this.cartServ.setOrders(this.orders);
        this.orderDataSource = new MatTableDataSource(this.orders);
        this.orderDataSource.paginator = this.paginator;
        this.orderDataSource.sort = this.sort;
      }
    );
  }

  orderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orderDataSource.paginator) {
      this.orderDataSource.paginator.firstPage();
    }
  }

  deleteOrder(id, index) {
    var flag = confirm("Do you want to delete?");
    if (flag){
      this.cartServ.deleteOrder(id, index);
    }
  }

  openOrderDialog(id, index){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {id: id};
    const dialogRef = this.dialog.open(EditOrderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.cartServ.editOrder(data, id, index);
          }
        }
    );   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
